import { IGetBanksForPaymentUseCase } from '@/src/application/use-cases/payment/get-banks-for-payment-use-case';
import { IBanks } from '@/src/entities/models/payment';

export type IGetBanksForPaymentController = ReturnType<
  typeof getBanksForPaymentController
>;

function presenter(banks: IBanks[]): { key: string; label: string }[] {
  const exists = new Set<string>();
  const uniqueBanks: { key: string; label: string }[] = [];

  banks.forEach((bank) => {
    if (!exists.has(bank.code)) {
      uniqueBanks.push({ key: bank.code, label: bank.name });
    }

    exists.add(bank.code);
  });

  return uniqueBanks;
}

export const getBanksForPaymentController =
  (getBanksForPaymentUseCase: IGetBanksForPaymentUseCase) => async () => {
    try {
      const banks = await getBanksForPaymentUseCase();
      return presenter(banks);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
