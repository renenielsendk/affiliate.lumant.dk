'use client';

import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';
import { useUser } from '@clerk/nextjs';

export const IntercomChat = () => {
  const user = useUser();

  useEffect(() => {
    if (user.isLoaded && user.isSignedIn) {
      Intercom({
        app_id: 'vb66rljd',
        user_id: user.user?.id,
        name: user.user?.fullName ?? undefined,
        email: user.user?.emailAddresses[0].emailAddress ?? undefined,
        created_at: user.user?.createdAt?.getTime() ?? undefined,
      });
    }
  }, [user.isLoaded, user.isSignedIn, user.user]);

  return null;
};
