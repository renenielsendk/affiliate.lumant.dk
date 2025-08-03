'use client';

import { createContext, ReactNode, useContext } from 'react';
import { AuthUser } from '@/types/auth';
import { redirect } from 'next/navigation';
import { CLERK_CONFIG } from '@/config/clerk';
import { useClerk } from '@clerk/nextjs';

export type ReturnProps = {
  user: AuthUser;
  signOut: any;
};

type Props = {
  authUser: AuthUser;
  children: ReactNode;
};

const AuthContext = createContext<ReturnProps | null>(null);

export const AuthProviderContent = ({ children, authUser }: Props) => {
  const { signOut } = useClerk();

  const signOutUser = async () => {
    await signOut();
    redirect(CLERK_CONFIG.SIGN_IN_URL);
  };

  return (
    <AuthContext.Provider
      value={{
        user: authUser,
        signOut: signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useCurrentUser = () => useContext(AuthContext) as ReturnProps;

export { AuthContext, useCurrentUser };
