import { IVerificationService } from '@/src/application/services/verification.service.interface';
import { IVerifyUser } from '@/src/entities/models/verification';
import axios from 'axios';

export class VerificationService implements IVerificationService {
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

    if (!this._token) {
      throw new Error('API Token is not configured properly.');
    }
  }

  async validateUser<T extends IVerifyUser>(input: T): Promise<boolean> {
    try {
      if (this._isDev) {
        return true;
      }

      // const formattedDate = formateDateToDbDate(input.user.dob);
      // const req = await axios.post(
      //   `${this._baseUrl}/v2/api/identity/ng/${input.type}`,
      //   {
      //     id: input.idNumber,
      //     premiumNin: true,
      //     isSubjectConsent: true,
      //     validations: {
      //       data: {
      //         lastName: input.user.lname,
      //         firstName: input.user.fname,
      //         dateOfBirth: formattedDate, //'1988-04-04'
      //       },
      //     },
      //   },
      //   {
      //     headers: {
      //       token: this._token,
      //     },
      //   }
      // );

      // if (!req.data.data.allValidationPassed) {
      //   throw new UnauthenticatedError('Wrong credentials');
      // }

      // return req.data.data.allValidationPassed;
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      }
      throw new Error(
        `Verification request failed: ${(error as Error).message}`
      );
    }
  }

  async validateUserAccount<T extends IVerifyUser>(input: T): Promise<string> {
    try {
      if (this._isDev) {
        return 'MICHAEL JOHN DOE';
      }

      // const req = await axios.post(
      //   `${this._baseUrl}/v2/api/identity/ng/bank-account-number/resolve`,
      //   {
      //     accountNumber: input.actNo,
      //     bankCode: input.bank,
      //     isSubjectConsent: true,
      //   },
      //   {
      //     headers: {
      //       token: this._token,
      //     },
      //   }
      // );

      // if (!Boolean(req.data.data.bankDetails.accountName?.length)) {
      //   throw new UnauthenticatedError('Wrong credentials');
      // }

      // return req.data.data.bankDetails.accountName;
      return 'MICHAEL JOHN DOE';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      }
      throw new Error(
        `Verification request failed: ${(error as Error).message}`
      );
    }
  }
}
