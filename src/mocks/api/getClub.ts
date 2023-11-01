import { defaultTo } from "lodash-es";
import { rest } from "msw";
import { ClubJson } from "../../models/clubTypes";
import clubJson from "../clubs.json";

export const getClub = rest.get(
  process.env.PUBLIC_URL + "/api/getClub",
  (req, res, ctx) => {
    const name = defaultTo(req.url.searchParams.get("name"), "");

    if (!req.url.searchParams.has("name")) {
      return res(ctx.status(400), ctx.json("missing name param"));
    }
    if (!(name in clubJson)) {
      return res(ctx.status(404), ctx.json(`club "${name}" not found`));
    }
    return res(
      ctx.status(200),
      ctx.json({
        name,
        ...(clubJson as ClubJson)[name]
      })
    );
  }
);
