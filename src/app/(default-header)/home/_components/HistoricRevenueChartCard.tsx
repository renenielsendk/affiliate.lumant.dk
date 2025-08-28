import dayjs from 'dayjs';
import { RevenueChartWidget } from '@/components/widgets/RevenueChartWidget';
import { SaasAffiliateTransaction } from '@prisma/client';

type Props = {
  transactions: SaasAffiliateTransaction[];
};

export const HistoricRevenueChartCard = async ({ transactions }: Props) => {
  // Show only last 6 months (including current)
  const monthsBack = 5;
  const currentDate = dayjs();
  const startDate = currentDate.subtract(monthsBack, 'month').startOf('month');
  const totalMonths = monthsBack + 1;

  // Prepare chart data
  const data = {
    labels: [] as string[],
    newRevenue: [] as number[],
  };

  // For each month in the range, calculate values
  Array.from({ length: totalMonths }).forEach((_, index) => {
    const date = startDate.add(index, 'month');
    data.labels.push(date.format('MMM'));

    // "New" revenue: paid or created in this month
    const newRevenueForMonth = transactions
      .filter((tx) => dayjs(tx.paidAt ?? tx.createdAt).isSame(date, 'month'))
      .reduce((acc, tx) => acc + (tx.netAmount || 0), 0);

    data.newRevenue.push(Math.round(newRevenueForMonth));
  });

  // Calculate change for today
  const today = dayjs();
  const todayRevenue = transactions
    .filter((tx) => dayjs(tx.paidAt ?? tx.createdAt).isSame(today, 'day'))
    .reduce((sum, tx) => sum + (tx.netAmount || 0), 0);

  // Calculate total revenue (sum of all newRevenue)
  const totalRevenue = data.newRevenue.reduce((acc, val) => acc + (val || 0), 0);

  return (
    <RevenueChartWidget
      title='Omsætning'
      current={{
        title: 'Total',
        value: totalRevenue,
      }}
      change={todayRevenue}
      changeText='i dag'
      chart={{
        labels: data.labels,
        stacked: true,
        series: [
          {
            name: 'Ny',
            type: 'bar',
            fill: 'solid',
            data: data.newRevenue,
          },
        ],
        yaxis: {
          ticker: 5,
        },
      }}
      isLoading={false}
    />
  );
};
