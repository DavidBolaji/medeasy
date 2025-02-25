import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { ICreateBidUseCase } from '@/src/application/use-cases/bid/create-bid-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import { bidSchema, BidSchemaType } from '@/src/entities/models/bid';

export type ICreateBidController = ReturnType<typeof createBidController>;

export const createBidController =
  (
    createBidUseCase: ICreateBidUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (
    input: BidSchemaType,
    sessionId: string | undefined,
    requestId: string
  ) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to bid');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const { data: bid, error: inputParseError } = bidSchema.safeParse(input);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      await createBidUseCase(bid, session.userId, requestId);
    } catch (error) {
      throw error;
    }
  };
