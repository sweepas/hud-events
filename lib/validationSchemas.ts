import { z } from 'zod';

export const createOrderSchema = z.object({
  userId: z.string(),
  eventId: z.string(),
  eventInfo: z.object({
    date: z.string(),
    isFree: z.boolean(),
    price: z.number(),
    title: z.string(),
  }),
});