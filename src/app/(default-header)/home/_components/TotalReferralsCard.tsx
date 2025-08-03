import dayjs from 'dayjs';
import { ReferralListItem } from '../_types/referral';
import { KeyMetricWidget } from '@/components/widgets/KeyMetricWidget';

type Props = {
  referrals: ReferralListItem[];
};

export const TotalReferralsCard = async ({ referrals }: Props) => {
  const today = dayjs();
  const totalReferrals = referrals.length;

  const totalReferralsToday = referrals.filter((referral) => dayjs(referral.createdAt).isSame(today, 'day')).length;

  return <KeyMetricWidget title='Henvisninger' change={totalReferralsToday || 0} total={totalReferrals || 0} />;
};
