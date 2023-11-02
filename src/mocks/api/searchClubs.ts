import { defaultTo } from "lodash-es";
import { rest } from "msw";
import { ClubData } from "../../models/clubTypes";
import { createClubList } from "../../util/misc";
import clubJson from "../clubs.json";

export const searchClubs = rest.get(
  process.env.PUBLIC_URL + "/api/searchClubs",
  (req, res, ctx) => {
    const query = defaultTo(req.url.searchParams.get("q"), "");
    const clubNames = Object.keys(clubJson)
      .filter((clubName) => clubName.toLowerCase().includes(query))
      .sort((a, b) => {
        // really inefficient since it keeps converting to lowercase
        const lowerCaseA = a.toLowerCase();
        const lowerCaseB = b.toLowerCase();
        // sort by index query appears at in the name
        const queryIndexA = lowerCaseA.indexOf(query);
        const queryIndexB = lowerCaseB.indexOf(query);

        if (queryIndexA === queryIndexB) {
          // tiebreaker: compare normally (ignoring case)
          return lowerCaseA.localeCompare(lowerCaseB);
        } else {
          return queryIndexA - queryIndexB;
        }
      });

    if (!req.url.searchParams.has("q")) {
      return res(ctx.status(400), ctx.json("Bad request: no query param"));
    }
    if (clubNames.length === 0) {
      return res(
        ctx.status(404),
        ctx.json(`No clubs found for query "${query}"`)
      );
    }
    return res(
      ctx.status(200),
      ctx.json<ClubData[]>(createClubList(clubJson, clubNames))
    );
  }
);
