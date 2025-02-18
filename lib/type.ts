export interface LoginResponse {
    user:         User;
    accessToken:  string;
    refreshToken: string;
}

export interface User {
    id:   number;
    name: string;
    role: string;
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}