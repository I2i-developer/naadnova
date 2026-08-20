import { z } from "zod";

export const trialClassSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  phone: z.string().min(7).max(30),
  instrument: z.string().min(1).max(80),
  ageGroup: z.string().min(1).max(40),
  learningMode: z.enum(["online", "offline", "either"]),
  experienceLevel: z.string().max(80).optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().max(80).optional(),
  message: z.string().max(1000).optional()
});

export type TrialClassInput = z.infer<typeof trialClassSchema>;
