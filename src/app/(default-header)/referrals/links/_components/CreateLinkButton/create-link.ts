'use server';

import { createChildLogger } from '@/libs/logger';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { validateAuth } from '@/libs/auth';
import { revalidatePath } from 'next/cache';

const dbClient = new PrismaClient();

type Props = {
  name: string;
  referralCode: string;
};

export const createLink = async ({ name, referralCode }: Props): Promise<void> => {
  createChildLogger({ trace: 'createLink' });
  const user = await validateAuth();

  await dbClient.saasAffiliateReferralLink.create({
    data: {
      name,
      referralCode,
      affiliateId: user.affiliate.id,
    },
  });

  revalidatePath(`/referrals/links`);
};
