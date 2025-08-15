import { createChildLogger } from '@/libs/logger';
import { PrismaClient, SaasAffiliate } from '@prisma/client';
import { validateAuth } from '@/libs/auth';
import { notFound } from 'next/navigation';

const dbClient = new PrismaClient();

export const fetchAffiliate = async (): Promise<SaasAffiliate> => {
  const logger = createChildLogger({ trace: 'fetchAffiliate' });
  const user = await validateAuth();

  const affiliate = await dbClient.saasAffiliate
    .findFirst({
      where: {
        id: user.affiliate.id,
      },
    });

  if (!affiliate) {
    logger.error({ trace: 'fetchAffiliate' }, 'Affiliate not found');
    return notFound();
  }

  return affiliate;
};
