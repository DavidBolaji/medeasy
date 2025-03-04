import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { AuthenticationError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import {
  GetAllRequestParams,
  ReturnIGetAllRequestType,
} from '@/src/entities/models/requests';
import { cookies } from 'next/headers';

interface GetAllRequest {
  success: boolean;
  error?: string;
  data?: ReturnIGetAllRequestType;
}

export const getAllRequest = async (
  input: GetAllRequestParams
): Promise<GetAllRequest> => {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  try {
    const getAllRequestController = getInjection('IGetAllRequestController');
    const response = await getAllRequestController(input, sessionId);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    if (
      error instanceof InputParseError ||
      error instanceof AuthenticationError
    ) {
      return {
        success: false,
        error: error.message,
      };
    }
    console.log((error as Error).message);
    return {
      success: false,
      error: 'Something went wrong',
    };
  }
};
