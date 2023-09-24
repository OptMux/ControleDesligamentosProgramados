export enum UserRole {
  admin = "admin",
  user = "user",
}

export interface User {
  id: number;
  name: string;
  role: UserRole;
}
export interface UserSliceState {
  loggedUser: User | null;
  isLoading: boolean;
}
