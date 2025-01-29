export interface User {
  id?: string;
  email: string;
  authProviders: AuthProvider;
  password: string;
}

export enum AuthProvider {
  LOCAL = 'Local',
  GOOGLE = 'Google',
}