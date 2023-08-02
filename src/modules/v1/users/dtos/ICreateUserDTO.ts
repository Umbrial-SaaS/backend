import { CreateSellerDTO } from '@modules/v1/sellers/dtos/CreateSellerDTO';

export default interface ICreateUserDTO {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  profile_photo?: string;
  password?: string;

  createdAt?: Date;
  updatedAt?: Date;

  seller?: CreateSellerDTO;
}
