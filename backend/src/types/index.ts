import type { IUser, UserRole } from '../models/User.js';

export type { IUser, UserRole };



export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}
export interface AuthJwtPayload {
  id: string;
  role: 'client' | 'admin';
}
