import { Bider, Request } from '@prisma/client';
import { array, z } from 'zod';

export const bidSchema = z.object({
  pitch: z.string(),
  start: z.string(),
  price: z.string(),
  newPrice: z.boolean(),
});

export type BidSchemaType = z.infer<typeof bidSchema>;

export const requestBiderSchema = z.object({
  id: z.string(),
  pitch: z.string(),
  price: z.number(),
  createdAt: z.string().or(z.date()),
  request: z.object({
    service: z.string(),
  }),
  user: z.object({
    id: z.string(),
    fname: z.string(),
    lname: z.string(),
    gender: z.enum(['Male', 'Female']),
    language: z.string(),
    cv: z.string(),
    certificates: z.array(
      z.object({
        name: z.string(),
        certificate: z.string(),
      })
    ),
    services: z.array(
      z.object({
        name: z.string(),
        experience: z.string(),
        duration: z.number(),
      })
    ),
    receivedReview: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        star: z.number(),
        reviewer: z.object({
          fname: z.string(),
          lname: z.string(),
        }),
      })
    ),
  }),
});

export type RequestBiderSchemaType = z.infer<typeof requestBiderSchema>;

export const acceptBiderSchema = z.object({
  requestId: z.string(),
  acceptedBiderId: z.string().or(z.undefined()),
  finalPrice: z.number(),
  stage: z.enum(['NEW', 'ONGOING', 'COMPLETED', 'CANCELLED']),
});

export type AccptedBiderSchemaType = z.infer<typeof acceptBiderSchema>;

export const counterBiderOfferSchema = z.object({
  bidingId: z.string(),
  price: z.string(),
});
export type CounterBiderOfferSchemaType = z.infer<
  typeof counterBiderOfferSchema
>;

export const counterBiderOfferValueSchema = counterBiderOfferSchema.omit({
  bidingId: true,
});

export type CounterBiderOfferValueSchemaType = z.infer<
  typeof counterBiderOfferValueSchema
>;

export type GetBidingOfferForRequestSchema = Bider & {
  request: Pick<Request, 'id' | 'price'>;
};

export type ReturnGetBidingOfferForRequestSchema = Pick<
  Bider,
  'counterPrice' | 'id' | 'price'
> & {
  request: Pick<Request, 'id' | 'price'>;
};

export const updateBidingOfferForRequestSchema = z.object({
  bidingId: z.string(),
  counterPrice: z.number(),
});
export type UpdateBidingOfferForRequestSchemaType = z.infer<
  typeof updateBidingOfferForRequestSchema
>;
