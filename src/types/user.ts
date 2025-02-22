export interface UserDto {
  username: string;
  email: string;
  type: 'user' | 'admin';
  password: string;
}

export interface UserEntry {
  email: string;
  type: 'user' | 'admin';
  salt: string;
  passwordHash: string;
}

export interface LoginDto {
  username: string;
  password: string;
}