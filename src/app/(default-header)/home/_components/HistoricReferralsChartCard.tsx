import dayjs from 'dayjs';
import { HorizontalChartWidget } from '@/components/widgets/HorizontalChartWidget';
import { ReferralListItem } from '../_types/referral';

type Props = {
  referrals: ReferralListItem[];
};

function getLastSixMonthsLabels() {
  const labels: string[] = [];
  const now = dayjs();
  for (let i = 5; i >= 0; i--) {
    labels.push(now.subtract(i, 'month').format('MMM YYYY'));
  }
  return labels;
}

function countByMonth(referrals: ReferralListItem[], dateKey: 'createdAt' | 'convertedAt', months: string[]) {
  const counts = Array(months.length).fill(0);
  referrals.forEach((ref) => {
    const date = ref[dateKey];
    if (!date) return;
    const d = dayjs(date);
    const label = d.format('MMM YYYY');
    const idx = months.indexOf(label);
    if (idx !== -1) {
      counts[idx]++;
    }
  });
  return counts;
}

export const HistoricReferralsChartCard = async ({ referrals }: Props) => {
  const labels = getLastSixMonthsLabels();

  const createdCounts = countByMonth(referrals, 'createdAt', labels);
  const convertedCounts = countByMonth(referrals, 'convertedAt', labels);

  const totalCreated = createdCounts.reduce((a, b) => a + b, 0);
  const totalConverted = convertedCounts.reduce((a, b) => a + b, 0);

  // Calculate change for today (created and converted)
  const today = dayjs();
  const createdToday = referrals.filter((r) => dayjs(r.createdAt).isSame(today, 'day')).length;
  const convertedToday = referrals.filter((r) => r.convertedAt && dayjs(r.convertedAt).isSame(today, 'day')).length;

  return (
    <HorizontalChartWidget
      title='Henvisninger sidste 6 måneder'
      current={{
        title: 'Total',
        value: totalCreated,
      }}
      change={{
        value: convertedToday,
        text: 'i dag',
      }}
      chart={{
        labels,
        stacked: true,
        series: [
          {
            name: 'Tilmeldt',
            type: 'bar',
            fill: 'solid',
            data: createdCounts,
          },
          {
            name: 'Konverteret',
            type: 'bar',
            fill: 'solid',
            data: convertedCounts,
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
