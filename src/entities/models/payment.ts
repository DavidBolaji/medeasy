export interface Payment {
  bank: string;
  actNo: string;
}

export interface IBanks {
  code: string;
  name: string;
}

export type CreatePayment = Payment;
