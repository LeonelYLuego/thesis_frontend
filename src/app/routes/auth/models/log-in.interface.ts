import { Account } from '@accounts/models/account.interface';

export interface LogInInterface {
  username: string;
  password: string;
}

export interface ResponseLogInInterface {
  token: string;
  account: Account;
}
