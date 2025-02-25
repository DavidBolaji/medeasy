import { z } from 'zod';

export interface Verification {
  id: string;
  type: string;
  doc: string;
  expiry: string;
}

export type ICreateVerification = Verification;

export const verifyUserSchema = z.object({
  type: z.string(),
  idNumber: z.string(),
  actNo: z.string().optional(),
  bank: z.string().regex(/^\d+$/).optional(),
  user: z.object({
    lname: z.string(),
    fname: z.string(),
    dob: z.string(),
  }),
});

export type IVerifyUser = z.infer<typeof verifyUserSchema>;
