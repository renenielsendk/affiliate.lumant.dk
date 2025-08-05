'use client';

import { Box, Card, CardContent, CardProps, CircularProgress, Stack, Typography } from '@mui/material';
import merge from 'lodash/merge';
import { formatCurrency } from '@/utils/format-number';
import { Chart, useChart } from '@/components/charts/Chart';
import { IconifyIcon } from '../IconifyIcon';

interface Props extends CardProps {
  height?: number;
  title?: string;
  chart: {
    labels: string[];
    stacked?: boolean;
    series: {
      name: string;
      data: (number | null)[];
      fill?: string;
      type?: string;
    }[];
    xaxis?: {
      ticker?: number;
    };
    yaxis?: {
      ticker?: number;
      labels?: {
        formatter: (val: any) => string;
      };
      min?: number;
      max?: number;
    };
  };
  isCurrency?: boolean;
  isPercentage?: boolean;
  current: {
    title?: string;
    value: number;
  };
  change?: {
    value: number;
    text: string;
  };
  isLoading?: boolean;
}

export const HorizontalChartWidget = ({
  title,
  height = 250,
  isCurrency = false,
  isPercentage = false,
  chart,
  current,
  change,
  isLoading = false,
  ...other
}: Props) => {
  const baseOptions = useChart();
  const options = merge(baseOptions, {
    legend: { position: 'top', horizontalAlign: 'right' },
    fill: { type: chart.series.map((i) => i.fill || 'area') },
    xaxis: {
      categories: chart.labels,
      tickAmount: chart.xaxis?.ticker || undefined,
    },
    yaxis: {
      labels: {
        formatter:
          chart.yaxis?.labels?.formatter || isCurrency
            ? (val: any) => {
                return formatCurrency(val);
              }
            : undefined,
      },
      min: chart.yaxis?.min || undefined,
      max: chart.yaxis?.max || undefined,
      tickAmount: chart.yaxis?.ticker || undefined,
    },
    chart: {
      stacked: chart.stacked || false,
    },
    tooltip: isCurrency
      ? {
          y: {
            formatter: (val: any) => {
              return formatCurrency(val);
            },
          },
        }
      : undefined,
  });

  const renderTrending = (
    <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
      <IconifyIcon
        width={24}
        icon={
          change && change.value < 0
            ? 'solar:double-alt-arrow-down-bold-duotone'
            : 'solar:double-alt-arrow-up-bold-duotone'
        }
        sx={{ flexShrink: 0, color: 'success.main', ...(change && change.value < 0 && { color: 'error.main' }) }}
      />

      <Box component='span' sx={{ typography: 'subtitle2' }}>
        {change && change.value > 0 && '+'}
        {change && (isCurrency ? formatCurrency(change.value) : isPercentage ? change.value + '%' : change.value)}
      </Box>
      <Box component='span' sx={{ typography: 'body2', color: 'text.secondary' }}>
        {change?.text || 'i dag'}
      </Box>
    </Box>
  );

  return (
    <Card {...other}>
      <CardContent>
        <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
          <Typography variant='h6'>{title}</Typography>
          {change && renderTrending}
        </Stack>
        <Stack spacing={3} flexDirection='row' alignItems='center' justifyContent='space-between' gap={3}>
          <Stack flexDirection='column'>
            <Typography variant='h4'>{isCurrency ? formatCurrency(current.value) : current.value}</Typography>
            <Typography color='grey.600' variant='subtitle2'>
              {current.title || 'Total'}
            </Typography>
          </Stack>
        </Stack>

        {chart.series.length <= 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <Typography variant='body2'>Data not available.</Typography>
          </Box>
        )}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: height }}>
            <CircularProgress />
          </Box>
        ) : (
          <Chart type='line' series={chart.series} options={options} height={height} width={'100%'} />
        )}
      </CardContent>
    </Card>
  );
};
