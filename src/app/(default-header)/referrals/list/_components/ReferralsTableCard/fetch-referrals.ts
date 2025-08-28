import { createChildLogger } from '@/libs/logger';
import { PrismaClient } from '@prisma/client';
import { validateAuth } from '@/libs/auth';
import { ReferralListItem } from './types';

const dbClient = new PrismaClient();

export const fetchReferrals = async (): Promise<ReferralListItem[]> => {
  createChildLogger({ trace: 'fetchReferrals' });
  const user = await validateAuth();

  console.log(user.affiliate.id);

  return await dbClient.saasAffiliateReferral
    .findMany({
      where: {
        affiliateId: user.affiliate.id,
      },
      select: {
        id: true,
        createdAt: true,
        status: true,
        conversionType: true,
        trialExpiresAt: true,
        convertedAt: true,
        email: true,
        name: true,
        instructor: {
          select: {
            businessInfo: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    .then((referrals) =>
      referrals.map((referral) => ({
        id: referral.id,
        name: referral.name ?? referral.instructor?.businessInfo?.name ?? '',
        email: referral.email ?? referral.instructor?.businessInfo?.contactEmail ?? '',
        status: referral.status,
        createdAt: referral.createdAt,
        conversionType: referral.conversionType,
        trialExpiresAt: referral.trialExpiresAt,
        convertedAt: referral.convertedAt,
      }))
    );
};
