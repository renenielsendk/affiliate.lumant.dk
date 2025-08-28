import { SaasAffiliateReferralStatus } from '@prisma/client';

export type ReferralListItem = {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
  status: SaasAffiliateReferralStatus;
  conversionType: string;
  trialExpiresAt: Date | null;
  convertedAt: Date | null;
};
