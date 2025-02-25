export interface ISubscriptionService {
  sendPushNotification(
    subscription: any,
    message: string,
    name: string
  ): Promise<void>;
}
