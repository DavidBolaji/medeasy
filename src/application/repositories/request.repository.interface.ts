import { AccptedBiderSchemaType } from '@/src/entities/models/bid';
import {
  GetAllRequestType,
  GetRequestsSchemaType,
  GetSingleRequestType,
  RequestSchemaType,
} from '@/src/entities/models/requests';
import { ITransaction } from '@/src/entities/models/transaction';
import { Request } from '@prisma/client';

export interface IRequestRepository {
  acceptOffer(input: AccptedBiderSchemaType): Promise<void>;

  getAccountOwnerRequests(
    input: GetRequestsSchemaType,
    userId: string
  ): Promise<{
    requests: (Request & {
      _count: {
        biders: number;
      };
    })[];
    total: number;
  }>;

  getAllRequests(
    input: GetRequestsSchemaType,
    userId: string
  ): Promise<{
    requests: GetAllRequestType[];
    total: number;
  }>;

  getSingleRequest(requestId: string): Promise<GetSingleRequestType | null>;

  createRequest(
    input: RequestSchemaType,
    userId: string,
    tx?: ITransaction
  ): Promise<void>;
}
