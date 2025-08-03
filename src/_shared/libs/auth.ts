import { PrismaClient } from '@prisma/client';
import { createChildLogger } from './logger';
import { currentUser } from '@clerk/nextjs/server';
import { AuthUser } from '@/types/auth';
import { User } from '@clerk/nextjs/dist/types/server';
import { redirect } from 'next/navigation';
import { CLERK_CONFIG } from '@/config/clerk';

const dbClient = new PrismaClient();

// Add the cache to the function when moving to server components
export const validateAuth = async (): Promise<AuthUser> => {
  const logger = createChildLogger({ trace: 'fetchAuthUser' });

  try {
    const providerUser = await currentUser();
    if (!providerUser || !(providerUser.unsafeMetadata as { is_affiliate: boolean }).is_affiliate) {
      throw new Error('Unauthorized');
    }

    const user = await findOneById(providerUser);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.log('error', error);
    logger.error({ trace: 'fetchAuthUser' }, 'Unauthorized');
    return redirect(CLERK_CONFIG.SIGN_IN_URL);
  }
};

const findOneById = async (providerUser: User): Promise<AuthUser | null> => {
  const logger = createChildLogger({ trace: 'findOneById' });

  const userId = providerUser?.unsafeMetadata?.user_id as string;
  if (!userId) {
    logger.error({ trace: 'fetchAuthUser', providerUserId: providerUser.id, userId }, 'UserNotFound: AuthProvider');
    return null;
  }

  const user = await dbClient.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      email: true,
      id: true,
      affiliateId: true,
    },
  });

  if (!user || !user.affiliateId) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    firstName: providerUser.firstName,
    affiliateId: user.affiliateId,
  };
};
