'use server';

import { SESSION_COOKIE } from '@/config';
import { getInjection } from '@/di/container';
import { UnauthenticatedError } from '@/src/entities/error/auth';
import { InputParseError } from '@/src/entities/error/common';
import { Cookie } from '@/src/entities/models/cookie';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signOut(url: string) {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  let blankCookie: Cookie;
  try {
    const signOutController = getInjection('ISignOutController');
    blankCookie = await signOutController(sessionId);
  } catch (err) {
    if (err instanceof UnauthenticatedError || err instanceof InputParseError) {
      return redirect(`/start/${url}/sign-in`);
    }
    throw err;
  }

  (await cookies()).set(
    blankCookie.name,
    blankCookie.value,
    blankCookie.attributes
  );

  return redirect(`/start/${url}/sign-in`);
}
