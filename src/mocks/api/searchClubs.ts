import { defaultTo, shuffle } from "lodash-es";
import { rest } from "msw";
import { ClubData } from "../../models/clubTypes";
import { createClubList, humanArrayJoiner } from "../../util/misc";
import { clubJson } from "../clubJson";

/**
 * Search clubJson. All parameters are optional.
 * @param q Returned clubs must contain this string in its name. If not provided
 *     or empty, all clubs will be returned.
 * @param categories A comma-separated list of categories. All returned clubs
 *     must be in at least one of these categories.
 * @param shuffle If string "true", results will be shuffled.
 * @param limit Results will be truncated to this many clubs. Must be positive.
 * @returns ClubData[] on success or an error string on failure
 */
export const searchClubs = rest.get(
  process.env.PUBLIC_URL + "/api/searchClubs",
  (req, res, ctx) => {
    const query = defaultTo(req.url.searchParams.get("q"), "");
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
              .map((val) => clubJson[clubName].categories.includes(val))
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
      let errorMessage = `No clubs found for query "${query}"`;
      errorMessage += humanArrayJoiner(
        categories,
        "or",
        " in your selected category: ",
        " in your selected categories: "
      );

      return res(ctx.status(404), ctx.json(errorMessage + "."));
    }

    if (req.url.searchParams.get("shuffle")?.toLowerCase() === "true")
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
