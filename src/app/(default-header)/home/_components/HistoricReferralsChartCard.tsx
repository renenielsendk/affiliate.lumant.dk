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

function countByMonthConverted(referrals: ReferralListItem[], months: string[]) {
  const counts = Array(months.length).fill(0);
  referrals.forEach((ref) => {
    const date = ref.convertedAt;
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

  const convertedCounts = countByMonthConverted(referrals, labels);

  const totalConverted = convertedCounts.reduce((a, b) => a + b, 0);

  // Calculate change for today (converted only)
  const today = dayjs();
  const convertedToday = referrals.filter((r) => r.convertedAt && dayjs(r.convertedAt).isSame(today, 'day')).length;

  return (
    <HorizontalChartWidget
      title='Konverteringer sidste 6 måneder'
      current={{
        title: 'Total',
        value: totalConverted,
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
