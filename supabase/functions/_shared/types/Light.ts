import { z } from "zod";

export const Light = z.object({
  intensity: z.number(),
});