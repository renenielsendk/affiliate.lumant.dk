export type ReferralListItem = {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
  status: string;
  conversionType: string;
  trialExpiresAt: Date | null;
  convertedAt: Date | null;
};
