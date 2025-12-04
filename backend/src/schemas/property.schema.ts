import { z } from 'zod';

export const createSchema = z.object({
  title: z.string().min(1),
  city: z.string().min(1),
  price: z.number().min(0),
  surface: z.number().min(1),
});

export const updateSchema = createSchema.partial();

export type CreateInput = z.infer<typeof createSchema>;
export type UpdateInput = z.infer<typeof updateSchema>;