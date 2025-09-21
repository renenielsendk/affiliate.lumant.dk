import { PrismaClient, SaasAffiliateReferralLink } from '@prisma/client';
import { createChildLogger } from '@/libs/logger';
import { validateAuth } from '@/libs/auth';

const dbClient = new PrismaClient();

export const fetchAffiliateLinks = async (): Promise<SaasAffiliateReferralLink[]> => {
  createChildLogger({ trace: 'fetchAffiliate' });
  const user = await validateAuth();

  return await dbClient.saasAffiliateReferralLink.findMany({
    where: {
      affiliateId: user.affiliate.id,
    },
  });
};
