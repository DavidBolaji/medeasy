import { formatDateToDbDate2, parseCurrencyToInt } from '@/app/_lib/utils';
import db from '@/prisma';
import { IRequestRepository } from '@/src/application/repositories/request.repository.interface';
import { AccptedBiderSchemaType } from '@/src/entities/models/bid';
import {
  GetAccountOwnerRequestType,
  GetAllRequestParams,
  GetAllRequestType,
  GetRequestsSchemaType,
  GetRequestStatType,
  GetSingleRequestType,
  IGetAllRequestType,
  RequestSchemaType,
} from '@/src/entities/models/requests';
import { ITransaction } from '@/src/entities/models/transaction';
import { Prisma, Stage } from '@prisma/client';
import { endOfYear, startOfYear } from 'date-fns';

export class RequestRepository implements IRequestRepository {
  async acceptOffer(input: AccptedBiderSchemaType): Promise<void> {
    try {
      await db.request.update({
        where: {
          id: input.requestId,
        },
        data: {
          acceptedBiderId: input?.acceptedBiderId || undefined,
          finalPrice: input.finalPrice,
          stage: input.stage,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllRequests(
    input: GetRequestsSchemaType,
    userId: string
  ): Promise<{
    requests: GetAllRequestType[];
    total: number;
  }> {
    const limit = +input.limit || 10;
    const skip = ((+input.page || 1) - 1) * limit;

    try {
      const [requests, total] = await Promise.all([
        db.request.findMany({
          where: {
            stage: input.stage.toUpperCase() as Stage,
            acceptedBider: {
              userId: input.stage !== 'new' ? userId : undefined,
            },
          },
          include: {
            user: {
              select: {
                fname: true,
                lname: true,
                gender: true,
                language: true,
                _count: {
                  select: {
                    requests: {
                      where: {
                        stage: 'COMPLETED',
                      },
                    },
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

            acceptedBider: {
              select: {
                user: {
                  select: {
                    fname: true,
                    lname: true,
                  },
                },
              },
            },
          },
          take: limit,
          skip,
          orderBy: { createdAt: 'desc' },
        }),
        db.request.count({
          where: {
            stage: input.stage.toUpperCase() as Stage,
          },
        }),
      ]);

      return { requests, total };
    } catch (error) {
      throw error;
    }
  }

  async getAllRequest({
    page = 1,
    limit = 10,
    sort,
    sortOrder,
    searchQuery,
  }: GetAllRequestParams): Promise<IGetAllRequestType> {
    const skip = (page - 1) * limit;

    const whereClause: Prisma.RequestWhereInput = {
      AND: [
        ...(searchQuery
          ? [
              {
                OR: [
                  { title: { contains: searchQuery } },
                  { location: { contains: searchQuery } },
                ],
              },
            ]
          : []),
      ],
    };

    const orderBy: Prisma.RequestOrderByWithRelationInput =
      sort === 'fname'
        ? {
            user: {
              fname: sortOrder as Prisma.SortOrder,
            },
          }
        : sort === 'provider'
          ? {
              acceptedBider: {
                user: {
                  fname: sortOrder as Prisma.SortOrder,
                },
              },
            }
          : {
              [sort as string]: sortOrder as Prisma.SortOrder,
            };
    try {
      const totalItems = await db.request.count({ where: whereClause });
      const request = await db.request.findMany({
        where: whereClause,
        include: {
          user: { select: { fname: true, lname: true } },
          acceptedBider: {
            select: { user: { select: { fname: true, lname: true } } },
          },
        },
        skip,
        take: limit,
        orderBy,
      });
      const totalPages = Math.ceil(totalItems / limit);
      return { requests: request ?? [], totalPages };
    } catch (error) {
      throw error;
    }
  }

  async getAccountOwnerRequests(
    input: GetRequestsSchemaType,
    userId: string
  ): Promise<{
    requests: GetAccountOwnerRequestType[];
    total: number;
  }> {
    const limit = +input.limit || 10;
    const skip = ((+input.page || 1) - 1) * limit;

    try {
      const [requests, total] = await Promise.all([
        db.request.findMany({
          where: {
            userId,
            stage: input.stage.toUpperCase() as Stage,
          },
          include: {
            _count: {
              select: { biders: true },
            },
            acceptedBider: {
              select: {
                user: {
                  select: {
                    id: true,
                    fname: true,
                    lname: true,
                    email: true,
                  },
                },
              },
            },
          },
          take: limit,
          skip,
          orderBy: { createdAt: 'desc' },
        }),
        db.request.count({
          where: {
            userId,
            stage: input.stage.toUpperCase() as Stage,
          },
        }),
      ]);

      return { requests, total };
    } catch (error) {
      throw error;
    }
  }

  async getRequestStat(): Promise<GetRequestStatType> {
    try {
      const result = await db.request.groupBy({
        by: ['stage'],
        _count: {
          id: true,
        },
      });
      const counts = Object.fromEntries(
        result.map(({ stage, _count }) => [stage, _count.id])
      );
      return counts;
    } catch (error) {
      throw error;
    }
  }

  async getMonthlyCompleted(): Promise<any> {
    try {
      const completed = await db.request.groupBy({
        by: ['createdAt'],
        where: {
          stage: 'COMPLETED',
          createdAt: {
            gte: startOfYear(new Date()),
            lte: endOfYear(new Date()),
          },
        },
        _count: {
          id: true,
        },
      });
      return completed;
    } catch (error) {
      throw error;
    }
  }

  async getSingleRequest(
    requestId: string
  ): Promise<GetSingleRequestType | null> {
    try {
      const request = await db.request.findUnique({
        where: {
          id: requestId,
        },
        include: {
          user: {
            select: {
              id: true,
              fname: true,
              lname: true,
              email: true,
            },
          },
          acceptedBider: {
            select: {
              pitch: true,
              price: true,
              createdAt: true,
              user: {
                select: {
                  fname: true,
                  lname: true,
                },
              },
            },
          },
        },
      });
      return request || null;
    } catch (error) {
      throw error;
    }
  }

  async deleteManyRequest(input: Set<string>): Promise<void> {
    console.log(input);
    try {
      await db.request.deleteMany({
        where: {
          id: {
            in: Array.from(input),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createRequest(
    input: RequestSchemaType,
    userId: string,
    tx?: ITransaction
  ): Promise<void> {
    const invoker = tx || db;

    try {
      await invoker.request.create({
        data: {
          service: input.service,
          title: input.title,
          description: input.description,
          duration: input.duration,
          start: new Date(formatDateToDbDate2(input.start)),
          location: input.location,
          price: parseCurrencyToInt(input.price),
          negotiable: input.negotiable,
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
