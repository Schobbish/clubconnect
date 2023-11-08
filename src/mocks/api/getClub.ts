import { defaultTo } from "lodash-es";
import { rest } from "msw";
import { ClubData } from "../../models/clubTypes";
import { clubJson } from "../clubJson";

export const getClub = rest.get(
  process.env.PUBLIC_URL + "/api/getClub",
  (req, res, ctx) => {
    const name = defaultTo(req.url.searchParams.get("name"), "");

    if (!req.url.searchParams.has("name")) {
      return res(ctx.status(400), ctx.json("Bad request: no name param"));
    }
    if (!(name in clubJson)) {
      return res(ctx.status(404), ctx.json(`Club "${name}" not found`));
    }
    return res(
      ctx.status(200),
      ctx.json<ClubData>({
        name,
        ...clubJson[name]
      })
    );
  }
);
