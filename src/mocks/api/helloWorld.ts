import { rest } from "msw";

export const helloWorld = rest.get(
  process.env.PUBLIC_URL + "/api/hello_world",
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json("hello,\nworld!"));
  }
);
