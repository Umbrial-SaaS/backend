import UserRole from '../infra/typeorm/entities/UserRole';

export default interface ICreateUserDTO {
  id: string;
  name: string;
  phone: string;
  email?: string;
  profile_photo?: string;
  password?: string;
  user_roles: UserRole[];
}
