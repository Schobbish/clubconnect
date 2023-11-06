import { rest } from "msw";

export const getCategories = rest.get(
  process.env.PUBLIC_URL + "/api/getCategories",
  (req, res, ctx) => {
    // temp return
    return res(
      ctx.status(200),
      ctx.json<string[]>([
        "OneOne OneOne",
        "TwoTwo TwoTwo",
        "ThreeThree Three",
        "FourFour Four",
        "FiveFive Five"
      ])
    );
  }
);
