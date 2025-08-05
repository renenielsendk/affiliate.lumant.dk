import dayjs from 'dayjs';
import { KeyMetricWidget } from '@/components/widgets/KeyMetricWidget';
import { SaasAffiliateTransaction } from '@prisma/client';

type Props = {
  transactions: SaasAffiliateTransaction[];
};

export const TotalRevenueReferralsCard = async ({ transactions }: Props) => {
  const today = dayjs();

  // Reduce netAmount for all transactions
  const totalRevenue = transactions.reduce((sum, tx) => sum + (tx.netAmount ?? 0), 0);

  // Reduce netAmount for today's transactions
  const totalRevenueToday = transactions
    .filter((tx) => dayjs(tx.createdAt).isSame(today, 'day'))
    .reduce((sum, tx) => sum + (tx.netAmount ?? 0), 0);

  return (
    <KeyMetricWidget
      isCurrency
      title="Omsætning"
      change={totalRevenueToday || 0}
      total={totalRevenue || 0}
    />
  );
};
