import { createNowFn } from "../mod.ts";

export const handler = createNowFn(async (req, res) => {
  res.json({ hello: req.query.name || "world" });
});
