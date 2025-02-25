import SignInForm from '@/app/_components/forms/auth/sign-in/sign-in';
import Typography from '@/app/_components/typography/typography';
import React from 'react';

interface SignUpPageSearchParams {}
export const revalidate = 0;

export default async function SignInPage({}: SignUpPageSearchParams) {
  return (
    <div className="mt-16">
      <Typography as="h3" className="mb-14">
        Sign in as an account owner
      </Typography>
      <SignInForm />
    </div>
  );
}
