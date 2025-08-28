export type ReferralListItem = {
  id: string;
  createdAt: Date;
  status: string;
  conversionType: string;
  trialExpiresAt: Date | null;
  meetingBookedAt: Date | null;
  convertedAt: Date | null;
};
