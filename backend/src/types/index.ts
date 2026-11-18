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