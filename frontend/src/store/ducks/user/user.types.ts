export interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}
export interface UserSliceState {
  loggedUser: User | null;
  isLoading: boolean;
}
