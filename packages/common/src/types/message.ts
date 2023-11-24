import { z } from "zod";
import { validMove } from "../validation/gameMove";

export type messageType = {
  error: {
    status: number;
    message: string;
  };
  move: z.infer<typeof validMove>;
};
