import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { ICounterBiderOfferUseCase } from '@/src/application/use-cases/bid/counter-bider-offer-use-case';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  counterBiderOfferSchema,
  CounterBiderOfferSchemaType,
} from '@/src/entities/models/bid';

export type ICounterBiderOfferController = ReturnType<
  typeof counterBiderOfferController
>;

export const counterBiderOfferController =
  (
    counterBiderOfferUseCase: ICounterBiderOfferUseCase,
    authenticationService: IAuthenticationService
  ) =>
  async (input: CounterBiderOfferSchemaType, sessionId: string | undefined) => {
    try {
      if (!sessionId) {
        throw new UnauthenticatedError('Must be logged in to update payments');
      }
      const { session } =
        await authenticationService.validateSession(sessionId);

      const { data: counter, error: inputParseError } =
        counterBiderOfferSchema.safeParse(input);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      await counterBiderOfferUseCase(counter, session.userId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
