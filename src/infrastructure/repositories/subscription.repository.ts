import db from '@/prisma';
import { ISubscriptionRepository } from '@/src/application/repositories/subscription.repository.interface';
import { subscription } from '@prisma/client';

export class SubscriptionRepository implements ISubscriptionRepository {
  private async getSubscription(subscription: PushSubscription) {
    try {
      const sub = await db.subscription.findMany({
        where: {
          pushUrl: JSON.stringify(subscription),
        },
      });
      return !!sub.length;
    } catch (error) {
      throw error;
    }
  }

  async getSubscriptionById(
    userId: string
  ): Promise<Pick<subscription, 'pushUrl'>[]> {
    try {
      const subscription = await db.subscription.findMany({
        where: {
          userId,
        },
        select: {
          pushUrl: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      // console.log('SUBSCRIPTION', subscription);
      return [subscription[0]];
    } catch (error) {
      throw error;
    }
  }

  async createSubscription(
    input: PushSubscription,
    userId: string
  ): Promise<boolean> {
    // const exist = await this.getSubscription(input);
    // if (exist) return true;

    try {
      await db.subscription.create({
        data: {
          pushUrl: JSON.stringify(input),
          userId,
        },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
}
