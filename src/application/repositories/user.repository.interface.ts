import { SignUpTwoSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { ITransaction } from '@/src/entities/models/transaction';
import {
  CreateUser,
  GetAllUserParams,
  GetAllUsersType,
  GetUserAccountStatusType,
  GetUserRoleCountType,
  UpdateUserVerification,
  User,
  UserWithPassword,
} from '@/src/entities/models/user';
import { IWorkDetail } from '@/src/entities/models/work';
import { ROLE, User as PUser, UserType } from '@prisma/client';

export interface IUsersRepository {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<UserWithPassword | undefined>;
  getUserRole(id: string): Promise<ROLE | undefined>;
  getUserType(id: string): Promise<UserType | undefined>;
  getUserRoleCount(): Promise<GetUserRoleCountType>;
  getUserAccountStatus(): Promise<GetUserAccountStatusType>;
  getAllUser(input: GetAllUserParams): Promise<GetAllUsersType>;

  getUserDetails(id: string): Promise<PUser | undefined>;
  getUserWorkDetails(id: string): Promise<IWorkDetail>;
  updateUserDetails(user: SignUpTwoSchemaType, userId: string): Promise<void>;
  updateWorkDetails(work: IWorkDetail, id: string): Promise<void>;
  updateVerification(input: UpdateUserVerification): Promise<void>;
  createUser(input: CreateUser, tx?: ITransaction): Promise<User>;
}
