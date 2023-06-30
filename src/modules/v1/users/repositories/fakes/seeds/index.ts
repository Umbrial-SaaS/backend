import { fakeSeller } from '@modules/v1/sellers/repositories/fakes/seeds';
import User from '@modules/v1/users/infra/typeorm/entities/User';

const fakeUserId = '6b92c866-16d6-11ee-be56-0242ac120002';

const fakeUser = new User();
Object.assign(fakeUser, {
  id: fakeUserId,
  createdAt: new Date(),
  email: 'thiago.watanabe@umbrial@checkout.com',
  avatar: '/photo.png',
  bio: 'Backend Developer',
  name: 'Thiago Watanabe',
  phone: '+1 (567) 266-0814',
  seller: fakeSeller,
});

export { fakeUser, fakeUserId };
