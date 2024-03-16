import { z } from "zod";

export const WaterLevel = z.object({
  level: z.boolean(),
});