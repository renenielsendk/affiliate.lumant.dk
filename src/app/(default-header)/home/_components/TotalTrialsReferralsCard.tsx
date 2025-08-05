import dayjs from 'dayjs';
import { ReferralListItem } from '../_types/referral';
import { KeyMetricWidget } from '@/components/widgets/KeyMetricWidget';
import { SaasAffiliateReferralStatus } from '@prisma/client';

type Props = {
  referrals: ReferralListItem[];
};

export const TotalTrialsReferralsCard = async ({ referrals }: Props) => {
  const today = dayjs();
  const totalReferrals = referrals.filter(
    (referral) => referral.status === SaasAffiliateReferralStatus.TRIALING
  ).length;

  const totalReferralsToday = referrals.filter(
    (referral) =>
      referral.status === SaasAffiliateReferralStatus.TRIALING && dayjs(referral.createdAt).isSame(today, 'day')
  ).length;

  return <KeyMetricWidget title='Prøveperioder' change={totalReferralsToday || 0} total={totalReferrals || 0} />;
};
