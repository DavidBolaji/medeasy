import { allSignUpSchemaType } from './auth/sign-up-schema';
import { ComponentType, ReactNode } from 'react';

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

export type GetUserRoleCountType = { [k: string]: number };
export type ReturnGetUserRoleCountType = { text: string; value: string };
export type GetUserAccountStatusType = {
  [k: string]: number;
};
export type ReturnGetUserAccountStatusType = {
  icon: ComponentType<{ color?: string }>;
  title: string;
  value: string;
};
