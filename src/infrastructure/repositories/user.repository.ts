import { IUsersRepository } from '@/src/application/repositories/user.repository.interface';
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
import { db } from '@/prisma';
import { formatDateToDbDate2 } from '@/app/_lib/utils';
import { SignUpTwoSchemaType } from '@/src/entities/models/auth/sign-up-schema';
import { IWorkDetail } from '@/src/entities/models/work';
import { ROLE, User as PUser, Prisma, UserType } from '@prisma/client';

export class UsersRepository implements IUsersRepository {
  constructor() {}
  async getUser(id: string): Promise<User | undefined> {
    try {
      const user = await db.user.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
        },
      });
      return user ? user : undefined;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<UserWithPassword | undefined> {
    try {
      const user = await db.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          password: true,
        },
      });

      return user ? user : undefined;
    } catch (error) {
      throw error;
    }
  }

  async getUserDetails(id: string): Promise<PUser> {
    try {
      const user = await db.user.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserWorkDetails(id: string): Promise<IWorkDetail> {
    try {
      const workDetail = await db.user.findFirstOrThrow({
        where: { id },
        select: {
          medTrained: true,
          cv: true,
        },
      });
      return workDetail;
    } catch (error) {
      throw error;
    }
  }

  async getUserRole(id: string): Promise<ROLE | undefined> {
    try {
      const role = await db.user.findUnique({
        where: {
          id,
        },
        select: {
          role: true,
        },
      });
      return role?.role;
    } catch (error) {
      throw error;
    }
  }

  async getUserType(id: string): Promise<UserType | undefined> {
    try {
      const user = await db.user.findUnique({
        where: {
          id,
        },
        select: {
          type: true,
        },
      });
      return user?.type;
    } catch (error) {
      throw error;
    }
  }

  async getUserRoleCount(): Promise<GetUserRoleCountType> {
    try {
      const result = await db.user.groupBy({
        by: ['role'],
        _count: {
          id: true,
        },
      });
      const counts = Object.fromEntries(
        result.map(({ role, _count }) => [role, _count.id])
      );
      return counts;
    } catch (error) {
      throw error;
    }
  }

  async getUserAccountStatus(): Promise<GetUserAccountStatusType> {
    try {
      const [total, verified, deleted] = await Promise.all([
        db.user.aggregate({
          where: { OR: [{ verified: 'FALSE' }, { verified: 'PENDING' }] },
          _count: { id: true },
        }),
        db.user.aggregate({
          where: { verified: 'TRUE' },
          _count: { id: true },
        }),
        db.user.aggregate({ where: { deleted: true }, _count: { id: true } }),
      ]);
      return {
        total: total._count.id,
        verified: verified._count.id,
        deleted: deleted._count.id,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllUser({
    page = 1,
    limit = 10,
    sort,
    sortOrder,
    searchQuery,
  }: GetAllUserParams): Promise<GetAllUsersType> {
    const skip = (page - 1) * limit;

    const whereClause: Prisma.UserWhereInput = {
      AND: [
        ...(searchQuery
          ? [
              {
                OR: [
                  { fname: { contains: searchQuery } },
                  { email: { contains: searchQuery } },
                ],
              },
            ]
          : []),
      ],
    };

    const orderBy: Prisma.UserOrderByWithRelationInput = {
      [sort as string]: sortOrder as Prisma.SortOrder,
    };
    try {
      const totalItems = await db.user.count({ where: whereClause });
      const users = await db.user.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy,
      });
      const totalPages = Math.ceil(totalItems / limit);
      return { users: users ?? [], totalPages };
    } catch (error) {
      throw error;
    }
  }

  async updateWorkDetails(work: IWorkDetail, id: string): Promise<void> {
    try {
      await db.user.update({
        where: {
          id,
        },
        data: {
          cv: work.cv,
          medTrained: work.medTrained,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateVerification(input: UpdateUserVerification): Promise<void> {
    try {
      await db.user.update({
        where: { id: input.userId },
        data: {
          verified: input.verified,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createUser(
    input: CreateUser,
    tx?: Prisma.TransactionClient
  ): Promise<User> {
    const invoker = tx ?? db;
    try {
      const user = await invoker.user.create({
        data: {
          fname: input.fname,
          lname: input.lname,
          email: input.email,
          gender: input.gender,
          dob: new Date(formatDateToDbDate2(input.dob)),
          password: input.password,
          language: input.language,
          cv: input.cv,
          medTrained: input.medical,
          role: input.role,
        },
        select: {
          id: true,
          email: true,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUserAccount(id: string): Promise<void> {
    try {
      await db.user.update({
        where: {
          id,
        },
        data: {
          deleted: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateUserDetails(
    user: SignUpTwoSchemaType,
    userId: string
  ): Promise<void> {
    try {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          fname: user.fname,
          lname: user.lname,
          language: user.language,
          gender: user.gender,
          dob: new Date(user.dob),
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
