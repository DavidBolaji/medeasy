import React from 'react';
import SignUpFlow from '../_components/sign-up-flow';

interface SignUpPageSearchParams {}
export const revalidate = 0;

export default async function SignUpPage({}: SignUpPageSearchParams) {
  return (
    <div className="md:w-auto w-full">
      <SignUpFlow />
    </div>
  );
}
