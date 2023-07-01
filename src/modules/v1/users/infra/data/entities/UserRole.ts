import 'reflect-metadata';

import Role from './Role';
import User from './User';

class UserRole {
  id: string;

  roleId: number;

  userId: string;

  role: Role;

  user: User;
}

export default UserRole;
