import { api } from './api';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const registerUser = (data: RegisterPayload) => {
  return api.post('auth/register', data);
};
