import User from './User';

class RefreshToken {
  id: string;

  accessToken: string;

  refreshToken: string;

  userId: string;

  expiresIn: number;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;

  user: User;
}

export default RefreshToken;
