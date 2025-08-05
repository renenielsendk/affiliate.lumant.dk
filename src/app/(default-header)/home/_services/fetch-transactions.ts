import { createChildLogger } from '@/libs/logger';
import { PrismaClient, SaasAffiliateTransaction } from '@prisma/client';
import { validateAuth } from '@/libs/auth';

const dbClient = new PrismaClient();

export const fetchTransactions = async (): Promise<SaasAffiliateTransaction[]> => {
  createChildLogger({ trace: 'fetchTransactions' });
  const user = await validateAuth();

  return await dbClient.saasAffiliateTransaction.findMany({
    where: {
      affiliateId: user.affiliate.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
