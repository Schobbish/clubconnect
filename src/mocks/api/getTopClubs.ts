import { shuffle } from "lodash-es";
import { rest } from "msw";
import { ClubData } from "../../models/clubTypes";
import { createClubList } from "../../util/misc";
import clubJson from "../clubs.json";

/** currently returns 6 random clubs */
export const getTopClubs = rest.get(
  process.env.PUBLIC_URL + "/api/getTopClubs",
  (req, res, ctx) => {
    const clubNames = shuffle(Object.keys(clubJson)).slice(6);
    return res(
      ctx.status(200),
      ctx.json<ClubData[]>(createClubList(clubJson, clubNames))
    );
  }
);
