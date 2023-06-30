import { fakeNotificationPreferences } from '@modules/v1/notifications/repositories/fakes/seeds';
import Seller from '@modules/v1/sellers/infra/typeorm/entities/Seller';
import { fakeUserId } from '@modules/v1/users/repositories/fakes/seeds';

const fakeSellerId = '29b4830d-a865-4d52-be63-b5816c48d11f';

const fakeSeller = new Seller();

Object.assign(fakeSeller, {
  id: fakeSellerId,
  defaultSupportEmail: 'thiago.watanabe@umbrial.com',
  defaultTwitterUrl: 'twitter.com/thiago.umbrial',
  defaultCurrency: 'BRL',
  defaultInstagramUrl: 'thiago.watanabe.umbrial',
  userId: fakeUserId,
  seller: fakeNotificationPreferences,
  notificationPreferences: fakeNotificationPreferences,
});

export { fakeSeller, fakeSellerId };
