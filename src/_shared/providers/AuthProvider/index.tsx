import { ReactNode } from 'react';
import { validateAuth } from '@/libs/auth';
import { AuthProviderContent } from './AuthProviderContent';
import { AuthUser } from '@/types/auth';

export type Props = {
  user: AuthUser;
  signOut: any;
};

export const AuthProvider = async ({ children }: { children: ReactNode }) => {
  const authUser = await validateAuth();

  return <AuthProviderContent authUser={authUser}>{children}</AuthProviderContent>;
};
