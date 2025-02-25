import React from 'react';
import AccountOwnerSignUpFlow from '../_components/account-owner-signup-flow';

interface SignUpPageSearchParams {}
export const revalidate = 0;

export default async function SignUpPage({}: SignUpPageSearchParams) {
  return (
    <div className="md:w-auto w-full">
      <AccountOwnerSignUpFlow />
    </div>
  );
}
