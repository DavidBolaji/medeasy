import db from '@/prisma';
import { IReviewRepository } from '@/src/application/repositories/review.repository.interface';
import {
  CreateReviwSchemaType,
  UpdateReviwSchemaType,
} from '@/src/entities/models/review';
import { ITransaction } from '@/src/entities/models/transaction';
import { Reviews } from '@prisma/client';

export class ReviewRepository implements IReviewRepository {
  async getSingleReview(
    receivedId: string,
    requestId: string,
    userId: string
  ): Promise<Reviews> {
    try {
      const review = await db.reviews.findMany({
        where: {
          AND: [
            {
              creatorId: userId,
            },
            {
              receivedId: receivedId,
            },
            {
              requestId,
            },
          ],
        },
      });
      return review[0];
    } catch (error) {
      throw error;
    }
  }

  async updateReview(input: UpdateReviwSchemaType): Promise<void> {
    try {
      await db.reviews.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          star: input.star,
        },
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  async createReview(
    input: CreateReviwSchemaType,
    userId: string,
    tx?: ITransaction
  ): Promise<void> {
    const invoker = tx ?? db;
    try {
      await invoker.reviews.create({
        data: {
          title: input.title,
          description: input.description,
          star: +input.star,
          creatorId: userId,
          receivedId: input.receivedId,
          requestId: input.requestId,
        },
      });

      return;
    } catch (error) {
      throw error;
    }
  }
}
