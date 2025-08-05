import dayjs from 'dayjs';
import { HorizontalChartWidget } from '@/components/widgets/HorizontalChartWidget';
import { SaasAffiliateTransaction } from '@prisma/client';

type Props = {
  transactions: SaasAffiliateTransaction[];
};

function getLastSixMonthsLabels() {
  const labels: string[] = [];
  const now = dayjs();
  for (let i = 5; i >= 0; i--) {
    labels.push(now.subtract(i, 'month').format('MMM YYYY'));
  }
  return labels;
}

function sumNetRevenueByMonth(transactions: SaasAffiliateTransaction[], months: string[]) {
  const netSums = Array(months.length).fill(0);

  transactions.forEach((tx) => {
    const d = dayjs(tx.paidAt ?? tx.createdAt);
    const label = d.format('MMM YYYY');
    const idx = months.indexOf(label);
    if (idx !== -1) {
      netSums[idx] += tx.netAmount;
    }
  });

  return netSums;
}

export const HistoricRevenueChartCard = async ({ transactions }: Props) => {
  const labels = getLastSixMonthsLabels();

  const netSums = sumNetRevenueByMonth(transactions, labels);

  const totalNet = netSums.reduce((a, b) => a + b, 0);

  const today = dayjs();
  const todayNet = transactions
    .filter((tx) => {
      const paidOrCreated = tx.paidAt ? dayjs(tx.paidAt) : dayjs(tx.createdAt);
      return paidOrCreated.isSame(today, 'day');
    })
    .reduce((sum, tx) => sum + tx.netAmount, 0);

  return (
    <HorizontalChartWidget
      title='Omsætning sidste 6 måneder'
      current={{
        title: 'Total',
        value: totalNet,
      }}
      change={{
        value: todayNet,
        text: 'i dag',
      }}
      chart={{
        labels,
        stacked: false,
        series: [
          {
            name: 'Netto',
            type: 'bar',
            fill: 'solid',
            data: netSums,
          },
        ],
        xaxis: {
          ticker: 4,
        },
        yaxis: {
          ticker: 5,
        },
      }}
    />
  );
};
