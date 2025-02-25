import { IPaymentService } from '@/src/application/services/payment.service.interface';
import { IBanks } from '@/src/entities/models/payment';
import axios from 'axios';

export class PaymentService implements IPaymentService {
  private _baseUrl: string;
  private _token: string;
  private _isDev = process.env.NEXT_PUBLIC_ENV === 'dev';

  constructor() {
    const baseUrl = this._isDev
      ? process.env.NEXT_PUBLIC_VERIFY_ME_DEV
      : process.env.NEXT_PUBLIC_VERIFY_ME_PROD;

    if (!baseUrl) {
      throw new Error(
        'Base URL for verification API is not configured properly.'
      );
    }

    this._baseUrl = baseUrl;
    this._token = process.env.VERIFY_ME_KEY!;
  }

  async getBanks(): Promise<IBanks[]> {
    try {
      const req = await axios.get(
        `${this._baseUrl}/v2/api/identity/ng/bank-account-number/bank-list`,

        {
          headers: {
            token: this._token,
          },
        }
      );

      return req.data.data;
    } catch (error) {
      throw new Error(`Get bank request failed: ${(error as Error).message}`);
    }
  }
}
