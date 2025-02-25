import { TRAINED } from '@prisma/client';

export interface IWorkDetail {
  cv: string;
  medTrained: TRAINED;
}
