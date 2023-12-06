import { defaultTo, escapeRegExp, shuffle } from "lodash-es";
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
    let clubNames = Object.keys(clubJson);

    // filter clubs by category if necessary
    if (categories.length !== 0) {
      clubNames = clubNames.filter((club) =>
        categories
          .map((val) => clubJson[club].categories.includes(val))
          .includes(true)
      );
    }

    // only do basic sort if no query since otherwise no matches
    if (query.length) {
      // calculate ratings of remaining clubs
      const clubRatings: { [key: string]: readonly number[] } = {};
      for (const club of clubNames) {
        clubRatings[club] = rateResult(club, query);
      }

      // filter out clubs with no matches
      clubNames = clubNames.filter(
        (club) =>
          clubRatings[club][0] !== 0 ||
          clubRatings[club][1] !== 0 ||
          clubRatings[club][3] !== 0
      );

      // sort names based on those ratings
      clubNames.sort((a, b) => {
        // find first differing index
        for (let i = 0; i < 5; i++) {
          if (clubRatings[a][i] !== clubRatings[b][i]) {
            // check if smaller or larger is better for this index
            return (
              ([2, 4].includes(i) ? 1 : -1) *
              (clubRatings[a][i] - clubRatings[b][i])
            );
          }
        }
        // last tiebreaker: alphabetical sort
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
    } else {
      clubNames.sort();
    }

    if (clubNames.length === 0) {
      let errorMessage = `No clubs found for query "${query}" (the club's name might be wrong or this club is not on the website)`;
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

/**
 * Rates how good a search result a club will be for a query.
 * @param clubName The club to rate. Should be in `clubJson`
 * @param query The query that's being run. Can't be empty.
 * @returns A 5-tuple with values as follows (by index):
 *     0. 1 if a word in query exact matches the club's acronym, 0 otherwise
 *     1. Number of words in `query` that appear in `clubName`
 *     2. Index of first occurance of a word in `query` in `clubName`
 *     3. Number of words in `query` that appear in the club description
 *     4. Index of first occurance of a word in `query` in the club description
 *
 * The intent is that these tuples can be compared in lexiographical order to
 *     determine an ordering of clubs. However, do note that indices 0, 1, and 3
 *     are better if larger and indices 2 and 4 are better if smaller, so a
 *     simple comparison will not work correctly.
 *
 * An occurence in `clubName` or the description only counts if it is preceeded
 *     by a non-word character or the start of the string (note that what comes
 *     after doesn't matter).
 *
 * `[0, 0, Infinity, 0, Infinity]` is the default if `clubName` is not a valid
 *     club or hopefully for degenerate queries.
 */
function rateResult(clubName: string, query: string): readonly number[] {
  if (clubName in clubJson && query.length) {
    // check acronym
    const clubAcronym = clubJson[clubName].acronym.toLowerCase();
    let acronymMatches = false;
    if (clubAcronym.length) {
      for (const word of query.split(" ")) {
        if (word.toLowerCase() === clubAcronym) acronymMatches = true;
      }
    }

    return [acronymMatches ? 1 : 0].concat(
      findMatchesAndIndex(clubName, query),
      findMatchesAndIndex(clubJson[clubName].description, query)
    );
  } else {
    return [0, 0, Infinity, 0, Infinity];
  }
}

/**
 * Finds the number of matches and first index of words in a query string.
 * @param target The string to search in.
 * @param query The query that's being run.
 * @returns A pair of numbers: first the number of matches
 *     and second the index of the first match. `[0, Infinity]` is hopefully
 *     returned for degenerate queries.
 */
function findMatchesAndIndex(target: string, query: string): readonly number[] {
  let numMatches = 0;
  let firstIndex = Infinity;

  for (const word of query.split(" ")) {
    if (word.length) {
      const wordRegEx = new RegExp(`(^|\\W)${escapeRegExp(word)}`, "ig");

      let match = wordRegEx.exec(target);
      while (match) {
        numMatches++;
        firstIndex = Math.min(firstIndex, match.index);
        match = wordRegEx.exec(target);
      }
    }
  }

  return [numMatches, firstIndex];
}
