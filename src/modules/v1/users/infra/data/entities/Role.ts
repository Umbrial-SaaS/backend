import 'reflect-metadata';
import UserRole from './UserRole';

class Role {
  id: number;

  name: string;

  userRoles: UserRole[];
}

export default Role;
