import { createNowFn } from "../mod.ts";

export const handler = createNowFn(async (req, res, internal) => {
  res.json({ req, res, internal });
});
