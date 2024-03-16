import { z } from "zod";

export const WaterTemperature = z.object({
  temperature: z.number(),
});