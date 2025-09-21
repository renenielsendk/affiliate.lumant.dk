import { PrismaClient } from '@prisma/client';
import { createChildLogger } from '@/libs/logger';
import { validateAuth } from '@/libs/auth';
import { notFound } from 'next/navigation';

const dbClient = new PrismaClient();

export const fetchAffiliate = async () => {
  createChildLogger({ trace: 'fetchAffiliate' });
  const user = await validateAuth();

  const affiliate = await dbClient.saasAffiliate.findFirst({
    where: {
      id: user.affiliate.id,
    },
  });

  if (!affiliate) {
    return notFound();
  }

  return affiliate;
};
