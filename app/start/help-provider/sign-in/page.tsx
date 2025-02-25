import SignInForm from '@/app/_components/forms/auth/sign-in/sign-in';
import Typography from '@/app/_components/typography/typography';
import React from 'react';

interface SignInPageSearchParams {}
export const revalidate = 0;

export default async function SignInPage({}: SignInPageSearchParams) {
  return (
    <div className="mt-16 md:w-auto w-full">
      <Typography as="h3" className="mb-14">
        Sign in as a Help provider
      </Typography>
      <SignInForm />
    </div>
  );
}
