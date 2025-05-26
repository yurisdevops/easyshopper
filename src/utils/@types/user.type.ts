import { User } from "firebase/auth";

export interface UserParams {
  email: string;
  password: string;
}
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
