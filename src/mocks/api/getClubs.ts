import { rest } from "msw";
import clubJson from "../clubData.json";

export const getClubs = rest.get(
  process.env.PUBLIC_URL + "/api/clubs",
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(clubJson));
  }
);
