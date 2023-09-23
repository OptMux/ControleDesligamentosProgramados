export enum UserRole {
  admin = "admin",
  user = "user",
}

export interface User {
  id: number;
  name: string;
  role: UserRole;
}
