export type ReferralListItem = {
  id: string;
  createdAt: Date;
  name: string;
  status: string;
  conversionType: string;
  trialExpiresAt: Date | null;
  convertedAt: Date | null;
};
