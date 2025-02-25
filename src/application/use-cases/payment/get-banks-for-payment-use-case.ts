import { IPaymentService } from '../../services/payment.service.interface';

export type IGetBanksForPaymentUseCase = ReturnType<
  typeof getBanksForPaymentUseCase
>;

export const getBanksForPaymentUseCase =
  (paymentServices: IPaymentService) => () => {
    try {
      const banks = paymentServices.getBanks();
      return banks;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
