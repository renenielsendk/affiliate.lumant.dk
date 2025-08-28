import { createChildLogger } from '@/libs/logger';
import { PrismaClient } from '@prisma/client';
import { validateAuth } from '@/libs/auth';
import { ReferralListItem } from '../_types/referral';

const dbClient = new PrismaClient();

export const fetchReferrals = async (): Promise<ReferralListItem[]> => {
  createChildLogger({ trace: 'fetchReferrals' });
  const user = await validateAuth();

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
        meetingBookedAt: true,
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
        status: referral.status,
        createdAt: referral.createdAt,
        conversionType: referral.conversionType,
        trialExpiresAt: referral.trialExpiresAt,
        convertedAt: referral.convertedAt,
        meetingBookedAt: referral.meetingBookedAt,
      }))
    );
};
