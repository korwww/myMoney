import { IUserLogin, IUserRegistration } from '@/models/user.model';
import { httpClient } from './http';

interface IAuthProps {
  email?: string;
  nickname?: string;
  password?: string;
}

export const checkedEmail = async (email: IAuthProps) => {
  return await httpClient.post('/users/checkedEmail', email);
};

export const checkedNickname = async (nickname: IAuthProps) => {
  return await httpClient.post('/users/checkedNickname', nickname);
};

export const join = async (
  userData: Omit<IUserRegistration, 'password_checked'>,
) => {
  return await httpClient.post('/users/join', userData);
};

export const login = async (userData: IUserLogin) => {
  return await httpClient.post('/users/login', userData);
};

export const logout = async () => {
  return await httpClient.post('/users/logout');
};
