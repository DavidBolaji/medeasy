import { createContainer } from '@evyweb/ioctopus';
import { DI_RETURN_TYPES, DI_SYMBOLS } from './types';
import { createAuthenticationModule } from './modules/auth.module';
import { createUsersModule } from './modules/user.module';
import { createCertificationModule } from './modules/certification.module';
import { createPaymentModule } from './modules/payment.module';
import { createVerificationModule } from './modules/verification.module';
import { createServiceModule } from './modules/service.module';
import { createWorkModule } from './modules/work.module';
import { createAddressModule } from './modules/address.module';
import { createTransactionModule } from './modules/transaction.module';
import { createRequestModule } from './modules/request.module';
import { createBidModule } from './modules/bid.modules';
import { createReviewnModule } from './modules/review.module';
import { createSubscriptionModule } from './modules/subscription.modules';
import { createNotificationModule } from './modules/notification.module';

const AppContainer = createContainer();

AppContainer.load(Symbol('AuthenticationModule'), createAuthenticationModule());
AppContainer.load(Symbol('AddressModule'), createAddressModule());
AppContainer.load(Symbol('BidModule'), createBidModule());
AppContainer.load(Symbol('CertificationModule'), createCertificationModule());
AppContainer.load(Symbol('PaymentModule'), createPaymentModule());
AppContainer.load(Symbol('RequestModule'), createRequestModule());
AppContainer.load(Symbol('NotificationModule'), createNotificationModule());
AppContainer.load(Symbol('SubscriptionModule'), createSubscriptionModule());
AppContainer.load(Symbol('ReviewModule'), createReviewnModule());
AppContainer.load(Symbol('UsersModule'), createUsersModule());
AppContainer.load(Symbol('TransactionModule'), createTransactionModule());
AppContainer.load(Symbol('VerificationModule'), createVerificationModule());
AppContainer.load(Symbol('ServiceModule'), createServiceModule());
AppContainer.load(Symbol('WorkModule'), createWorkModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] {
  return AppContainer.get(DI_SYMBOLS[symbol]);
}
