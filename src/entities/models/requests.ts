import { GENDER, Request } from '@prisma/client';
import { ComponentType } from 'react';
import { z } from 'zod';

export type RequestStatus = 'new' | 'ongoing' | 'completed';

export interface RequestTabsProps {
  activeTab: RequestStatus;
}

export type GetAccountOwnerRequestType = Request & {
  _count: {
    biders: number;
  };
  acceptedBider: {
    user: {
      id: string;
      fname: string;
      lname: string;
      email: string;
    };
  } | null;
};

export const requestSchema = z.object({
  service: z.string(),
  title: z.string(),
  description: z.string(),
  duration: z.string(),
  start: z.string(),
  location: z.string(),
  price: z.string(),
  finalPrice: z.string().or(z.undefined()),
  negotiable: z.boolean(),
});

export type RequestSchemaType = z.infer<typeof requestSchema>;

export const returnRequestSchema = requestSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    finalPrice: z.number(),
    stage: z.enum(['NEW', 'ONGOING', 'COMPLETED', 'CANCELLED']),
    biders: z.number(),
    acceptedBiderId: z.string().or(z.null()),
    acceptedBider: z
      .object({
        user: z.object({
          id: z.string(),
          fname: z.string(),
          lname: z.string(),
        }),
      })
      .or(z.null()),
  })
);

export type ReturnRequestSchemaType = z.infer<typeof returnRequestSchema>;

export const returnAllRequestSchema = requestSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    finalPrice: z.string(),
    user: z.object({
      id: z.string(),
      fname: z.string(),
      lname: z.string(),
      language: z.string(),
      gender: z.enum(['Male', 'Female']),
      completedRequests: z.number(),
      reviews: z.array(
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
    acceptedBider: z
      .object({
        user: z.object({
          fname: z.string(),
          lname: z.string(),
        }),
      })
      .or(z.null()),
  })
);

export type ReturnAllRequestSchemaType = z.infer<typeof returnAllRequestSchema>;

export const returnSingleRequestSchema = requestSchema.merge(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    user: z.object({
      id: z.string(),
      fname: z.string(),
      lname: z.string(),
      email: z.string().email(),
    }),
  })
);

export type ReturnSingleRequestSchemaType = z.infer<
  typeof returnSingleRequestSchema
>;

export type GetRequestsSchemaType = {
  stage: RequestStatus;
  page: string;
  limit: string;
};

export type GetAllRequestType = Request & {
  user: {
    fname: string;
    lname: string;
    gender: GENDER;
    language: string;
    _count: {
      requests: number;
    };
    receivedReview: {
      title: string;
      description: string;
      star: number;
      reviewer: {
        fname: string;
        lname: string;
      };
    }[];
  } | null;
  acceptedBider: {
    user: {
      fname: string;
      lname: string;
    };
  } | null;
};

export type GetSingleRequestType = (Request | null) & {
  user: {
    id: string;
    fname: string;
    lname: string;
    email: string;
  } | null;
};

export type GetRequestStatType = { [k: string]: number };
export type ReturnGetRequestStatType = {
  icon: ComponentType<{ color?: string }>;
  title: string;
  value: string;
};
