export interface IUser {
  email: string;
  password: string;
}

export interface IUserRegistration extends IUser {
  nickname: string;
}
