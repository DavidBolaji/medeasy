import { formateDateToDbDate, parseCurrencyToInt } from '@/app/_lib/utils';
import db from '@/prisma';
import { IBidRepository } from '@/src/application/repositories/bid.repository.interface';
import {
  BidSchemaType,
  CounterBiderOfferSchemaType,
  GetBidingOfferForRequestSchema,
  RequestBiderSchemaType,
  UpdateBidingOfferForRequestSchemaType,
} from '@/src/entities/models/bid';

export class BidRepository implements IBidRepository {
  private async hasBided(userId: string, requestId: string): Promise<boolean> {
    try {
      const bided = await db.bider.findMany({
        where: {
          AND: [{ userId }, { requestId }],
        },
      });
      return !!bided.length;
    } catch (error) {
      throw error;
    }
  }
  async createBid(
    input: BidSchemaType,
    userId: string,
    requestId: string
  ): Promise<void> {
    try {
      const exists = await this.hasBided(userId, requestId);
      if (exists) throw new Error('User has already bided');
      await db.bider.create({
        data: {
          price: parseCurrencyToInt(input.price),
          userId,
          requestId,
          pitch: input.pitch,
          start: new Date(formateDateToDbDate(input.start)),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getBiders(requestId: string): Promise<RequestBiderSchemaType[]> {
    try {
      const biders = await db.bider.findMany({
        where: {
          requestId: requestId,
        },
        select: {
          id: true,
          pitch: true,
          price: true,
          createdAt: true,
          // request
          request: {
            select: {
              service: true,
            },
          },
          // user
          user: {
            select: {
              id: true,
              fname: true,
              lname: true,
              gender: true,
              language: true,
              cv: true,
              certificates: {
                select: {
                  name: true,
                  certificate: true,
                },
              },
              services: {
                select: {
                  name: true,
                  experience: true,
                  duration: true,
                },
              },
              receivedReview: {
                select: {
                  title: true,
                  description: true,
                  star: true,
                  reviewer: {
                    select: {
                      fname: true,
                      lname: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return biders;
    } catch (error) {
      throw error;
    }
  }

  async counterBid(input: CounterBiderOfferSchemaType): Promise<void> {
    try {
      await db.bider.update({
        where: {
          id: input.bidingId,
        },
        data: {
          counterPrice: parseCurrencyToInt(input.price),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getBider(
    requestId: string,
    userId: string
  ): Promise<GetBidingOfferForRequestSchema> {
    try {
      const bider = await db.bider.findFirstOrThrow({
        where: {
          AND: [
            {
              requestId,
            },
            {
              userId,
            },
          ],
        },
        include: {
          request: {
            select: {
              id: true,
              price: true,
            },
          },
        },
      });
      return bider;
    } catch (error) {
      throw error;
    }
  }

  async updateBiderPrice(
    input: UpdateBidingOfferForRequestSchemaType
  ): Promise<void> {
    try {
      await db.bider.update({
        where: {
          id: input.bidingId,
        },
        data: {
          price: input.counterPrice,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
