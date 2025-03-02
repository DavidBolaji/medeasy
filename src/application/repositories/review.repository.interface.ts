import {
  CreateReviwSchemaType,
  ReviewsWithId,
  UpdateReviwSchemaType,
} from '@/src/entities/models/review';
import { ITransaction } from '@/src/entities/models/transaction';
import { Reviews } from '@prisma/client';

export interface IReviewRepository {
  getSingleReview(
    receivedId: string,
    requestId: string,
    userId: string
  ): Promise<Reviews>;
  getReviewsWithId(userId: string): Promise<ReviewsWithId[]>;

  updateReview(input: UpdateReviwSchemaType): Promise<void>;
  createReview(
    input: CreateReviwSchemaType,
    userId: string,
    tx?: ITransaction
  ): Promise<void>;
}
