export interface IUser {
  email: string;
  nickname: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegistration extends IUser {
  password: string;
  password_checked: string;
}
