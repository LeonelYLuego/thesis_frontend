export interface Account {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface CreateAccountInterface {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
}
