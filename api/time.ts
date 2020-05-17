import { createNowFn } from "../mod.ts";

export const handler = createNowFn(async (_, res) => {
  res.json({ time: new Date().toISOString() });
});
