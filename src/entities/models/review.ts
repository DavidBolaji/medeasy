import { z } from 'zod';

export const reviwFormSchema = z.object({
  title: z.string({ message: 'title is required' }),
  description: z.string(),
  star: z.number({ message: 'star must be string' }),
});

export type ReviwFormSchemaType = z.infer<typeof reviwFormSchema>;

export const createReviwSchema = reviwFormSchema.merge(
  z.object({
    receivedId: z.string(),
    requestId: z.string(),
  })
);

export type CreateReviwSchemaType = z.infer<typeof createReviwSchema>;

export const updateReviwSchema = reviwFormSchema.merge(
  z.object({
    id: z.string(),
    receivedId: z.string(),
    requestId: z.string(),
  })
);

export type UpdateReviwSchemaType = z.infer<typeof updateReviwSchema>;

export const returnSingleReviwSchema = reviwFormSchema.merge(
  z.object({
    id: z.string(),
    receivedId: z.string(),
    creatorId: z.string(),
  })
);

export type ReturnSingleReviewSchemaType = z.infer<
  typeof returnSingleReviwSchema
>;
