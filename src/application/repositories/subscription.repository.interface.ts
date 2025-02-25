import { subscription } from '@prisma/client';

export interface ISubscriptionRepository {
  getSubscriptionById(userId: string): Promise<Pick<subscription, 'pushUrl'>[]>;
  createSubscription(input: PushSubscription, userId: string): Promise<boolean>;
}
