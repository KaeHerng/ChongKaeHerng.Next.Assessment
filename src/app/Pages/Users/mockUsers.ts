export type UserRole = 'admin' | 'staff';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Admin One',
    email: 'admin@demo.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-01',
  },
  {
    id: 2,
    name: 'Staff A',
    email: 'staffa@demo.com',
    role: 'staff',
    status: 'active',
    createdAt: '2025-01-05',
  },
  {
    id: 3,
    name: 'Staff B',
    email: 'staffb@demo.com',
    role: 'staff',
    status: 'inactive',
    createdAt: '2025-01-08',
  },
];