import { allSignUpSchemaType } from './auth/sign-up-schema';
import { ComponentType } from 'react';
import { User as PUser, ROLE, Verified } from '@prisma/client';

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

export interface GetAllUserParams {
  page?: number;
  limit?: number;
  sort?: string;
  sortOrder?: string;
  searchQuery?: string;
}

export interface Customer {
  id: string;
  fname: string;
  lname: string;
  email: string;
  role: ROLE;
  verified: Verified;
  createdAt: string;
}

export type GetAllUsersType = { users: PUser[]; totalPages: number };
export type ReturnGetAllUsersType = { users: Customer[]; totalPages: number };

export interface UpdateUserVerification {
  userId: string;
  verified: Verified;
}
