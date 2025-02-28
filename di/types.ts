import { IGetAddressForUserController } from '@/src/adapters/address/get-address-for-user.controller';
import { ISignInController } from '@/src/adapters/auth/sign-in.controller';
import { ISignOutController } from '@/src/adapters/auth/sign-out.controller';
import {
  ISignUpAccountOwnerController,
  ISignUpController,
} from '@/src/adapters/auth/sign-up.controller';
import { IAcceptBiderOfferController } from '@/src/adapters/bid/accept-bid.controller';
import { ICreateBidController } from '@/src/adapters/bid/create-bid-controller';
import { IGetBidersForRequestController } from '@/src/adapters/bid/get-biders-for-request.controller';
import { ISubscribeToPushNotificationController } from '@/src/adapters/subscription/subscribe-to-push-notification.controller';
import { IGetBanksForPaymentController } from '@/src/adapters/payment/get-banks-for-payment.controller';
import { IGetPaymentsForUserController } from '@/src/adapters/payment/get-payment-for-user.controller';
import { IUpdatePaymentForUserController } from '@/src/adapters/payment/update-payment-for-user.controller';
import { IUpdatePaymentValidationForUserController } from '@/src/adapters/payment/update-payment-validation.controller';
import { ICreateRequestController } from '@/src/adapters/request/create-request.controller';
import { IGetAllRequestsController } from '@/src/adapters/request/get-all-requests.controller';
import { IGetAccountOwnerRequestsController } from '@/src/adapters/request/get-requests-account-owner.controller';
import { IGetSingleRequestController } from '@/src/adapters/request/get-single-request.controller';
import { ICreateReviewController } from '@/src/adapters/review/create-review.controller';
import { IGetSingleReviewController } from '@/src/adapters/review/get-single-revew.controller';
import { IUpdateReviewController } from '@/src/adapters/review/update-review.controller';
import { IGetServiceForUserController } from '@/src/adapters/services/get-service-for-user.controller';
import { IUpdateServiceForUserController } from '@/src/adapters/services/update-service-for-user.controller';
import { IGetDetailsForUserController } from '@/src/adapters/users/get-details-for-user.controller';
import { IGetUserRoleController } from '@/src/adapters/users/get-user-role.controller';
import { IUpdateDetailsForUserController } from '@/src/adapters/users/update-detail-for-user.controller';
import { IGetVerificationForUserController } from '@/src/adapters/verification/get-verification.controller';
import { IUpdateIDVerificationForUserController } from '@/src/adapters/verification/update-id-verification-for-user.controller';
import { IUpdateVerificationForUserController } from '@/src/adapters/verification/update-verification-for-user.controller';
import { IverificationController } from '@/src/adapters/verification/verification.controller';
import { IGetWorkForUserController } from '@/src/adapters/work/get-work-for-user.controller';
import { IUpdateWorkForUserController } from '@/src/adapters/work/update-work-for-user.controller';
import { IAddressRepository } from '@/src/application/repositories/address.repository.interface';
import { IBidRepository } from '@/src/application/repositories/bid.repository.interface';

import { ICertificationRepository } from '@/src/application/repositories/certification.repository.interface';
import { IPaymentRepository } from '@/src/application/repositories/payment.repository.interface';
import { IRequestRepository } from '@/src/application/repositories/request.repository.interface';
import { IReviewRepository } from '@/src/application/repositories/review.repository.interface';
import { IServiceRepository } from '@/src/application/repositories/service.repository.interface';
import { IUsersRepository } from '@/src/application/repositories/user.repository.interface';
import { IVerificationRepository } from '@/src/application/repositories/verification.repository.interface';
import { IAuthenticationService } from '@/src/application/services/auth.service.interface';
import { IPaymentService } from '@/src/application/services/payment.service.interface';
import { ITransactionService } from '@/src/application/services/transaction.service.interface';
import { IVerificationService } from '@/src/application/services/verification.service.interface';
import { IGetAddressForUserUseCase } from '@/src/application/use-cases/address/get-address-for-user-use-case';
import { IAcceptBiderOfferUseCase } from '@/src/application/use-cases/bid/accept-bid-use-case';
import { ICreateBidUseCase } from '@/src/application/use-cases/bid/create-bid-use-case';
import { IGetBidersForRequestUseCase } from '@/src/application/use-cases/bid/get-biders-for-request-use-case';
import { IGetBanksForPaymentUseCase } from '@/src/application/use-cases/payment/get-banks-for-payment-use-case';
import { IGetPaymentsForUserUseCase } from '@/src/application/use-cases/payment/get-payment-for-user-use-case';
import { IUpdatePaymentForUserUseCase } from '@/src/application/use-cases/payment/update-payment-for-user-use-case';
import { IUpdatePaymentValidationForUserUseCase } from '@/src/application/use-cases/payment/update-payment-validation-use-case';
import { ICreateRequestUseCase } from '@/src/application/use-cases/request/create-request-use-case';
import { IGetAllRequestsUseCase } from '@/src/application/use-cases/request/get-all-requests-use-case';
import { IGetAccountOwnerRequestsUseCase } from '@/src/application/use-cases/request/get-requests-account-owner-use-case';
import { IGetSingleRequestUseCase } from '@/src/application/use-cases/request/get-single-request-use-case';
import { ICreateReviewUseCase } from '@/src/application/use-cases/review/create-review-use-case';
import { IGetSingleReviewUseCase } from '@/src/application/use-cases/review/get-single-review-use-case';
import { IUpdateReviewUseCase } from '@/src/application/use-cases/review/update-review-use-case';
import { IGetServiceForUserUseCase } from '@/src/application/use-cases/service/get-service-for-user-use-case';
import { IUpdateServiceForUserUseCase } from '@/src/application/use-cases/service/update-service-for-user-use-case';
import { ISignInUseCase } from '@/src/application/use-cases/sign-in-use-case';
import { ISignOutUseCase } from '@/src/application/use-cases/sign-out.use-case';
import {
  ISignUpAccountOwnerUseCase,
  ISignUpUseCase,
} from '@/src/application/use-cases/sign-up-use-case';
import { IGetDetailForUserUseCase } from '@/src/application/use-cases/user/get-detail-for-user-use-case';
import { IUpdateDetailsForUserUseCase } from '@/src/application/use-cases/user/update-detail-for-user-use-case';
import { IGetVerificationForUserUseCase } from '@/src/application/use-cases/verification/get-verification-use-case';
import { IUpdateIDVerificationForUserUseCase } from '@/src/application/use-cases/verification/update-id-verification-for-user-use-case';
import { IUpdateVerificationForUserUseCase } from '@/src/application/use-cases/verification/update-verification-for-user-use-case';
import { IVerificationUseCase } from '@/src/application/use-cases/verification/verification-use-case';
import { IGetWorkForUserUseCase } from '@/src/application/use-cases/work/get-work-for-user-use-case';
import { IUpdateWorkForUserUseCase } from '@/src/application/use-cases/work/update-work-for-user-use-case';
import { ISubscribeToPushNotificationUseCase } from '@/src/application/use-cases/subscription/subscribe-to-push-notification-use-case';
import { ISubscriptionRepository } from '@/src/application/repositories/subscription.repository.interface';
import { ICreateNotificationController } from '@/src/adapters/notification/create-notification.controller';
import { ICreateNotificationUseCase } from '@/src/application/use-cases/notification/create-notification-use-case';
import { INotificationRepository } from '@/src/application/repositories/notification.repository.interface';
import { ISendPushController } from '@/src/adapters/subscription/send-push.controller';
import { ISendPushUseCase } from '@/src/application/use-cases/subscription/send-push-use-case';
import { ISubscriptionService } from '@/src/application/services/subscription.service.interface';
import { IGetNotificationsForUserController } from '@/src/adapters/notification/get-notification-for-user.controller';
import { IGetNotificationsForUserUseCase } from '@/src/application/use-cases/notification/get-notification-for-user-use-case';
import { IUpdateNotificationsForUserUseCase } from '@/src/application/use-cases/notification/update-notification-for-user-use-case';
import { IUpdateNotificationsForUserController } from '@/src/adapters/notification/update-notification-for-user.controller';
import { ICounterBiderOfferUseCase } from '@/src/application/use-cases/bid/counter-bider-offer-use-case';
import { ICounterBiderOfferController } from '@/src/adapters/bid/counter-bider-offer.controller';
import { IGetBidingOfferForRequestController } from '@/src/adapters/bid/get-biding-offer-for-request.controller';
import { IGetBidingOfferForRequestUseCase } from '@/src/application/use-cases/bid/get-biding-offer-for-request-use-case';
import { IUpdateBidingOfferForRequestController } from '@/src/adapters/bid/update-biding-offer-for-request.controller';
import { IUpdateBidingOfferForRequestUseCase } from '@/src/application/use-cases/bid/update-biding-offer-for-request-use-case';
import { ISignInAdminController } from '@/src/adapters/auth/sign-in-admin.controller';
import { IsignInAdminUseCase } from '@/src/application/use-cases/sign-in-admin-use-case';
import { IGetUserRoleCountUseCase } from '@/src/application/use-cases/user/get-user-role-count-use-case';
import { IGetUserRoleCountController } from '@/src/adapters/users/get-user-role-count.controller';
import { IGetUserAccountStatusController } from '@/src/adapters/users/get-user-account-status.controller';
import { IGetUserAccountStatusUseCase } from '@/src/application/use-cases/user/get-user-account-status-use-case';
import { IGetRequestStatController } from '@/src/adapters/request/get-request-stat.controller';
import { IGetRequestStatusUseCase } from '@/src/application/use-cases/request/get-request-stat-use-case';
import { IGetMonthlyCompletedController } from '@/src/adapters/request/get-monthly-completed.controller';
import { IGetMonthlyCompletedUseCase } from '@/src/application/use-cases/request/get-monthly-completed-use-case';
import { IGetAllUserController } from '@/src/adapters/users/get-all-user.controller';
import { IGetAllUserUseCase } from '@/src/application/use-cases/user/get-all-user-use-case';
// localhost:3000/dashboard/help-provider/personal-details
export const DI_SYMBOLS = {
  IAuthenticationService: Symbol.for('IAuthenticationService'),
  IVerificationService: Symbol.for('IVerificationService'),
  IPaymentService: Symbol.for('IPaymentService'),
  ITransactionService: Symbol.for('ITransactionService'),

  ISignUpController: Symbol.for('ISignUpController'),
  ISignUpAccountOwnerController: Symbol.for('ISignUpAccountOwnerController'),
  ISignInController: Symbol.for('ISignInController'),
  ISignOutController: Symbol.for('ISignOutController'),
  IVerificationController: Symbol.for('IVerificationController'),
  IGetBanksForPaymentController: Symbol.for('IGetBanksForPaymentController'),
  IGetDetailsForUserController: Symbol.for('IGetDetailsForUserController'),
  IUpdateDetailsForUserController: Symbol.for(
    'IUpdateDetailsForUserController'
  ),
  IGetServiceForUserController: Symbol.for('IGetServiceForUserController'),
  IGetWorkForUserController: Symbol.for('IGetWorkForUserController'),
  IGetUserRoleController: Symbol.for('IGetUserRoleController'),
  IUpdateIDVerificationForUserController: Symbol.for(
    'IUpdateIDVerificationForUserController'
  ),
  IUpdateWorkForUserController: Symbol.for('IUpdateWorkForUserController'),
  IGetVerificationForUserController: Symbol.for(
    'IGetVerificationForUserController'
  ),
  IUpdateServiceForUserController: Symbol.for(
    'IUpdateServiceForUserController'
  ),
  IUpdateVerificationForUserController: Symbol.for(
    'IUpdateVerificationForUserController'
  ),
  IGetPaymentsForUserController: Symbol.for('IGetPaymentsForUserController'),
  IUpdatePaymentForUserController: Symbol.for(
    'IUpdatePaymentForUserController'
  ),
  IUpdatePaymentValidationForUserController: Symbol.for(
    'IUpdatePaymentValidationForUserController'
  ),
  IGetAddressForUserController: Symbol.for('IGetAddressForUserController'),
  ICreateRequestController: Symbol.for('ICreateRequestController'),
  IGetAccountOwnerRequestsController: Symbol.for(
    'IGetAccountOwnerRequestsController'
  ),
  IGetAllRequestsController: Symbol.for('IGetAllRequestsController'),
  IGetSingleRequestController: Symbol.for('IGetSingleRequestController'),
  ICreateBidController: Symbol.for('ICreateBidController'),
  IGetBidersForRequestController: Symbol.for('IGetBidersForRequestController'),
  IAcceptBiderOfferController: Symbol.for('IAcceptBiderOfferController'),
  ICreateReviewController: Symbol.for('ICreateReviewController'),
  IGetSingleReviewController: Symbol.for('IGetSingleReviewController'),
  IUpdateReviewController: Symbol.for('IUpdateReviewController'),
  ISubscribeToPushNotificationController: Symbol.for(
    'ISubscribeToPushNotificationController'
  ),
  ICreateNotificationController: Symbol.for('ICreateNotificationController'),
  ISendPushController: Symbol.for('ISendPushController'),
  IGetNotificationsForUserController: Symbol.for(
    'IGetNotificationsForUserController'
  ),
  IUpdateNotificationsForUserController: Symbol.for(
    'IUpdateNotificationsForUserController'
  ),
  ICounterBiderOfferController: Symbol.for('ICounterBiderOfferController'),
  IGetBidingOfferForRequestController: Symbol.for(
    'IGetBidingOfferForRequestController'
  ),
  IUpdateBidingOfferForRequestController: Symbol.for(
    'IUpdateBidingOfferForRequestController'
  ),
  ISignInAdminController: Symbol.for('ISignInAdminController'),
  IGetUserRoleCountController: Symbol.for('IGetUserRoleCountController'),
  IGetUserAccountStatusController: Symbol.for(
    'IGetUserAccountStatusController'
  ),
  IGetRequestStatController: Symbol.for('IGetRequestStatController'),
  IGetMonthlyCompletedController: Symbol.for('IGetMonthlyCompletedController'),
  IGetAllUserController: Symbol.for('IGetAllUserController'),

  ISignUpUseCase: Symbol.for('ISignUpUseCase'),
  ISignUpAccountOwnerUseCase: Symbol.for('ISignUpAccountOwnerUseCase'),
  ISignInUseCase: Symbol.for('ISignInUseCase'),
  ISignOutUseCase: Symbol.for('ISignOutUseCase'),
  IVerificationUseCase: Symbol.for('IVerificationUseCase'),
  IGetBanksForPaymentUseCase: Symbol.for('IGetBanksForPaymentUseCase'),
  IGetDetailsForUserUseCase: Symbol.for('IGetDetailsForUserUseCase'),
  IUpdateDetailsForUserUseCase: Symbol.for('IUpdateDetailsForUserUseCase'),
  IGetServiceForUserUseCase: Symbol.for('IGetServiceForUserUseCase'),
  IUpdateServiceForUserUseCase: Symbol.for('IUpdateServiceForUserUseCase'),
  IUpdateWorkForUserUseCase: Symbol.for('IUpdateWorkForUserUseCase'),
  IGetWorkForUserUseCase: Symbol.for('IGetWorkForUserUseCase'),
  IUpdateIDVerificationForUserUseCase: Symbol.for(
    'IUpdateIDVerificationForUserUseCase'
  ),
  IGetVerificationForUserUseCase: Symbol.for('IGetVerificationForUserUseCase'),
  IUpdateVerificationForUserUseCase: Symbol.for(
    'IUpdateVerificationForUserUseCase'
  ),
  IGetPaymentsForUserUseCase: Symbol.for('IGetPaymentsForUserUseCase'),
  IUpdatePaymentForUserUseCase: Symbol.for('IUpdatePaymentForUserUseCase'),
  IUpdatePaymentValidationForUserUseCase: Symbol.for(
    'IUpdatePaymentValidationForUserUseCase'
  ),
  IGetAddressForUserUseCase: Symbol.for('IGetAddressForUserUseCase'),
  ICreateRequestUseCase: Symbol.for('ICreateRequestUseCase'),
  IGetAccountOwnerRequestsUseCase: Symbol.for(
    'IGetAccountOwnerRequestsUseCase'
  ),
  IGetAllRequestsUseCase: Symbol.for('IGetAllRequestsUseCase'),
  IGetSingleRequestUseCase: Symbol.for('IGetSingleRequestUseCase'),
  ICreateBidUseCase: Symbol.for('ICreateBidUseCase'),
  IGetBidersForRequestUseCase: Symbol.for('IGetBidersForRequestUseCase'),
  IAcceptBiderOfferUseCase: Symbol.for('IAcceptBiderOfferUseCase'),
  ICreateReviewUseCase: Symbol.for('ICreateReviewUseCase'),
  IGetSingleReviewUseCase: Symbol.for('IGetSingleReviewUseCase'),
  IUpdateReviewUseCase: Symbol.for('IUpdateReviewUseCase'),
  ISubscribeToPushNotificationUseCase: Symbol.for(
    'ISubscribeToPushNotificationUseCase'
  ),
  ICreateNotificationUseCase: Symbol.for('ICreateNotificationUseCase'),
  ISendPushUseCase: Symbol.for('ISendPushUseCase'),
  IGetNotificationsForUserUseCase: Symbol.for(
    'IGetNotificationsForUserUseCase'
  ),
  IUpdateNotificationsForUserUseCase: Symbol.for(
    'IUpdateNotificationsForUserUseCase'
  ),
  ICounterBiderOfferUseCase: Symbol.for('ICounterBiderOfferUseCase'),
  IGetBidingOfferForRequestUseCase: Symbol.for(
    'IGetBidingOfferForRequestUseCase'
  ),
  IUpdateBidingOfferForRequestUseCase: Symbol.for(
    'IUpdateBidingOfferForRequestUseCase'
  ),
  ISignInAdminUseCase: Symbol.for('ISignInAdminUseCase'),
  IGetUserRoleCountUseCase: Symbol.for('IGetUserRoleCountUseCase'),
  IGetUserAccountStatusUseCase: Symbol.for('IGetUserAccountStatusUseCase'),
  IGetRequestStatUseCase: Symbol.for('IGetRequestStatUseCase'),
  IGetMonthlyCompletedUseCase: Symbol.for('IGetMonthlyCompletedUseCase'),
  IGetAllUserUseCase: Symbol.for('IGetAllUserUseCase'),

  IUsersRepository: Symbol.for('IUsersRepository'),
  ICertificationRepository: Symbol.for('ICertificationRepository'),
  IPaymentRepository: Symbol.for('IPaymentRepository'),
  IVerificationRepository: Symbol.for('IVerificationRepository'),
  IServiceRepository: Symbol.for('IServiceRepository'),
  IAddressRepository: Symbol.for('IAddressRepository'),
  IRequestRepository: Symbol.for('IRequestRepository'),
  IBidRepository: Symbol.for('IBidRepository'),
  IReviewRepository: Symbol.for('IReviewRepository'),
  ISubscriptionRepository: Symbol.for('ISubscriptionRepository'),
  INotificationRepository: Symbol.for('INotificationRepository'),
  ISubscriptionService: Symbol.for('ISubscriptionService'),
};

export interface DI_RETURN_TYPES {
  IAuthenticationService: IAuthenticationService;
  IVerificationService: IVerificationService;
  IPaymentService: IPaymentService;
  ITransactionService: ITransactionService;
  ISubscriptionService: ISubscriptionService;
  // controller
  ISignUpController: ISignUpController;
  ISignUpAccountOwnerController: ISignUpAccountOwnerController;
  ISignInController: ISignInController;
  ISignOutController: ISignOutController;
  IVerificationController: IverificationController;
  IGetBanksForPaymentController: IGetBanksForPaymentController;
  IGetDetailsForUserController: IGetDetailsForUserController;
  IUpdateDetailsForUserController: IUpdateDetailsForUserController;
  IGetServiceForUserController: IGetServiceForUserController;
  IUpdateServiceForUserController: IUpdateServiceForUserController;
  IGetWorkForUserController: IGetWorkForUserController;
  IGetUserRoleController: IGetUserRoleController;
  IUpdateWorkForUserController: IUpdateWorkForUserController;
  IGetVerificationForUserController: IGetVerificationForUserController;
  IUpdateVerificationForUserController: IUpdateVerificationForUserController;
  IUpdateIDVerificationForUserController: IUpdateIDVerificationForUserController;
  IGetPaymentsForUserController: IGetPaymentsForUserController;
  IUpdatePaymentForUserController: IUpdatePaymentForUserController;
  IUpdatePaymentValidationForUserController: IUpdatePaymentValidationForUserController;
  IGetAddressForUserController: IGetAddressForUserController;
  ICreateRequestController: ICreateRequestController;
  IGetAccountOwnerRequestsController: IGetAccountOwnerRequestsController;
  IGetAllRequestsController: IGetAllRequestsController;
  IGetSingleRequestController: IGetSingleRequestController;
  ICreateBidController: ICreateBidController;
  IGetBidersForRequestController: IGetBidersForRequestController;
  IAcceptBiderOfferController: IAcceptBiderOfferController;
  ICreateReviewController: ICreateReviewController;
  IGetSingleReviewController: IGetSingleReviewController;
  IUpdateReviewController: IUpdateReviewController;
  ISubscribeToPushNotificationController: ISubscribeToPushNotificationController;
  ICreateNotificationController: ICreateNotificationController;
  ISendPushController: ISendPushController;
  IGetNotificationsForUserController: IGetNotificationsForUserController;
  IUpdateNotificationsForUserController: IUpdateNotificationsForUserController;
  ICounterBiderOfferController: ICounterBiderOfferController;
  IGetBidingOfferForRequestController: IGetBidingOfferForRequestController;
  IUpdateBidingOfferForRequestController: IUpdateBidingOfferForRequestController;
  ISignInAdminController: ISignInAdminController;
  IGetUserRoleCountController: IGetUserRoleCountController;
  IGetUserAccountStatusController: IGetUserAccountStatusController;
  IGetRequestStatController: IGetRequestStatController;
  IGetMonthlyCompletedController: IGetMonthlyCompletedController;
  IGetAllUserController: IGetAllUserController;

  ISignUpUseCase: ISignUpUseCase;
  ISignUpAccountOwnerUseCase: ISignUpAccountOwnerUseCase;
  ISignInUseCase: ISignInUseCase;
  ISignOutUseCase: ISignOutUseCase;
  IVerificationUseCase: IVerificationUseCase;
  IGetBanksForPaymentUseCase: IGetBanksForPaymentUseCase;
  IGetDetailsForUserUseCase: IGetDetailForUserUseCase;
  IUpdateDetailsForUserUseCase: IUpdateDetailsForUserUseCase;
  IGetServiceForUserUseCase: IGetServiceForUserUseCase;
  IUpdateServiceForUserUseCase: IUpdateServiceForUserUseCase;
  IGetWorkForUserUseCase: IGetWorkForUserUseCase;
  IUpdateWorkForUserUseCase: IUpdateWorkForUserUseCase;
  IGetVerificationForUserUseCase: IGetVerificationForUserUseCase;
  IUpdateVerificationForUserUseCase: IUpdateVerificationForUserUseCase;
  IUpdateIDVerificationForUserUseCase: IUpdateIDVerificationForUserUseCase;
  IGetPaymentsForUserUseCase: IGetPaymentsForUserUseCase;
  IUpdatePaymentForUserUseCase: IUpdatePaymentForUserUseCase;
  IUpdatePaymentValidationForUserUseCase: IUpdatePaymentValidationForUserUseCase;
  IGetAddressForUserUseCase: IGetAddressForUserUseCase;
  ICreateRequestUseCase: ICreateRequestUseCase;
  IGetAccountOwnerRequestsUseCase: IGetAccountOwnerRequestsUseCase;
  IGetAllRequestsUseCase: IGetAllRequestsUseCase;
  IGetSingleRequestUseCase: IGetSingleRequestUseCase;
  ICreateBidUseCase: ICreateBidUseCase;
  IGetBidersForRequestUseCase: IGetBidersForRequestUseCase;
  IAcceptBiderOfferUseCase: IAcceptBiderOfferUseCase;
  ICreateReviewUseCase: ICreateReviewUseCase;
  IGetSingleReviewUseCase: IGetSingleReviewUseCase;
  IUpdateReviewUseCase: IUpdateReviewUseCase;
  ISubscribeToPushNotificationUseCase: ISubscribeToPushNotificationUseCase;
  ICreateNotificationUseCase: ICreateNotificationUseCase;
  ISendPushUseCase: ISendPushUseCase;
  IGetNotificationsForUserUseCase: IGetNotificationsForUserUseCase;
  IUpdateNotificationsForUserUseCase: IUpdateNotificationsForUserUseCase;
  ICounterBiderOfferUseCase: ICounterBiderOfferUseCase;
  IGetBidingOfferForRequestUseCase: IGetBidingOfferForRequestUseCase;
  IUpdateBidingOfferForRequestUseCase: IUpdateBidingOfferForRequestUseCase;
  ISignInAdminUseCase: IsignInAdminUseCase;
  IGetUserRoleCountUseCase: IGetUserRoleCountUseCase;
  IGetUserAccountStatusUseCase: IGetUserAccountStatusUseCase;
  IGetRequestStatUseCase: IGetRequestStatusUseCase;
  IGetMonthlyCompletedUseCase: IGetMonthlyCompletedUseCase;
  IGetAllUserUseCase: IGetAllUserUseCase;

  IUsersRepository: IUsersRepository;
  ICertificationRepository: ICertificationRepository;
  IPaymentRepository: IPaymentRepository;
  IVerificationRepository: IVerificationRepository;
  IServiceRepository: IServiceRepository;
  IAddressRepository: IAddressRepository;
  IRequestRepository: IRequestRepository;
  IBidRepository: IBidRepository;
  IReviewRepository: IReviewRepository;
  ISubscriptionRepository: ISubscriptionRepository;
  INotificationRepository: INotificationRepository;
}
