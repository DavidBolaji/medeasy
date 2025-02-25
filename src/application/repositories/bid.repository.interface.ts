import {
  BidSchemaType,
  CounterBiderOfferSchemaType,
  GetBidingOfferForRequestSchema,
  RequestBiderSchemaType,
  UpdateBidingOfferForRequestSchemaType,
} from '@/src/entities/models/bid';

export interface IBidRepository {
  createBid(
    input: BidSchemaType,
    userId: string,
    requestId: string
  ): Promise<void>;
  getBiders(requestId: string): Promise<RequestBiderSchemaType[]>;
  getBider(
    requestId: string,
    userId: string
  ): Promise<GetBidingOfferForRequestSchema>;
  updateBiderPrice(
    input: UpdateBidingOfferForRequestSchemaType,
    userId: string
  ): Promise<void>;
  counterBid(input: CounterBiderOfferSchemaType, userId: string): Promise<void>;
}
