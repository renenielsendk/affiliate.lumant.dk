import { createChildLogger } from '@/libs/logger';
import { PrismaClient } from '@prisma/client';
import { validateAuth } from '@/libs/auth';
import { ReferralListItem } from './types';

const dbClient = new PrismaClient();

export const fetchReferrals = async (): Promise<ReferralListItem[]> => {
  createChildLogger({ trace: 'fetchReferrals' });
  const user = await validateAuth();

  return await dbClient.saasAffiliateReferral
    .findMany({
      where: {
        affiliateId: user.affiliateId,
      },
      select: {
        id: true,
        createdAt: true,
        status: true,
        conversionType: true,
        instructor: {
          select: {
            businessInfo: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    .then((referrals) =>
      referrals.map((referral) => ({
        id: referral.id,
        name: referral.instructor.businessInfo.name,
        status: referral.status,
        createdAt: referral.createdAt,
        conversionType: referral.conversionType,
      }))
    );
};
