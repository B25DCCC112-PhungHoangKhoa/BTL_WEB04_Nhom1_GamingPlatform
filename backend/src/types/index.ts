import type { IUser, UserRole } from '../models/User.js';
import type { IGame } from '../models/Game.js';
export type { IUser, UserRole, IGame };




export interface CreateGameRequestBody {
  name: string;
  slug?: string;
  thumbnail?: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateGameRequestBody {
  name?: string;
  slug?: string;
  thumbnail?: string;
  description?: string;
  isActive?: boolean;
}
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
