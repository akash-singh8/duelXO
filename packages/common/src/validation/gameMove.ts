import { z } from "zod";

export const validMove = z.object({
  row: z.number().int().min(0).max(2),
  col: z.number().int().min(0).max(2),
});
