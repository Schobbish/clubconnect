import { defaultTo, shuffle } from "lodash-es";
import { rest } from "msw";
import { ClubData, ClubJson } from "../../models/clubTypes";
import { createClubList } from "../../util/misc";
import clubJson from "../clubs.json";

export const searchClubs = rest.get(
  process.env.PUBLIC_URL + "/api/searchClubs",
  (req, res, ctx) => {
    const query = defaultTo(req.url.searchParams.get("q"), "");
    if (!req.url.searchParams.has("q")) {
      return res(ctx.status(400), ctx.json("Bad request: no query param"));
    }

    const categoriesParam = defaultTo(
      req.url.searchParams.get("categories"),
      ""
    );
    const categories =
      categoriesParam.length === 0 ? [] : categoriesParam.split(",");
    let clubNames = Object.keys(clubJson)
      .filter(
        (clubName) =>
          clubName.toLowerCase().includes(query) &&
          (categories.length === 0 ||
            categories
              .map((val) => (clubJson as ClubJson)[clubName].tags.includes(val))
              .includes(true))
      )
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
    if (clubNames.length === 0) {
      return res(
        ctx.status(404),
        ctx.json(`No clubs found for query "${query}"`)
      );
    }

    if (req.url.searchParams.get("shuffle") === "true")
      clubNames = shuffle(clubNames);

    if (req.url.searchParams.has("limit")) {
      const limitParam = req.url.searchParams.get("limit");
      const limit = Number(limitParam);

      if (isNaN(limit) || limit <= 0) {
        return res(
          ctx.status(400),
          ctx.json(`Bad request: bad limit param "${limitParam}"`)
        );
      } else {
        clubNames = clubNames.slice(0, limit);
      }
    }

    return res(
      ctx.status(200),
      ctx.json<ClubData[]>(createClubList(clubJson, clubNames))
    );
  }
);
