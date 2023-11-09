import { rest } from "msw";
import { clubJson } from "../clubJson";

export const getCategories = rest.get(
  process.env.PUBLIC_URL + "/api/getCategories",
  (req, res, ctx) => {
    const categories = new Set<string>();

    for (const clubName of Object.keys(clubJson)) {
      clubJson[clubName].categories.forEach((val) => categories.add(val));
    }

    return res(
      ctx.status(200),
      ctx.json<string[]>(Array.from(categories).sort())
    );
  }
);
