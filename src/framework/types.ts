export interface AuthState {
  email: string | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}
