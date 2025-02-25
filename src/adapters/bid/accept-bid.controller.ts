import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IAcceptBiderOfferUseCase } from '@/src/application/use-cases/bid/accept-bid-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  acceptBiderSchema,
  AccptedBiderSchemaType,
} from '@/src/entities/models/bid';

export type IAcceptBiderOfferController = ReturnType<
  typeof acceptBiderOfferController
>;

export const acceptBiderOfferController =
  (
    acceptBiderOfferUseCase: IAcceptBiderOfferUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (input: AccptedBiderSchemaType, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to get requests');
      }

      await authenticationService.validateSession(sessionId);

      const { data: bider, error: inputParseError } =
        acceptBiderSchema.safeParse(input);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      return await acceptBiderOfferUseCase(bider);
    } catch (error) {
      throw error;
    }
  };
