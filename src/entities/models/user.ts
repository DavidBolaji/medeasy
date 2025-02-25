import { allSignUpSchemaType } from './auth/sign-up-schema';

export interface User {
  id: string;
  email: string;
}
export interface UserWithPassword {
  id: string;
  email: string;
  password: string;
}

export type CreateUser = Omit<
  allSignUpSchemaType,
  | 'services'
  | 'experience'
  | 'exp_length'
  | 'certifications'
  | 'type'
  | 'no'
  | 'doc'
  | 'expiry'
  | 'bank'
  | 'actNo'
  | 'verified'
  | 'actVerified'
  | 'verifiedName'
>;
