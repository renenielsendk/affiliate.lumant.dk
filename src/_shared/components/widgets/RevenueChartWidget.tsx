'use client';

import { formatCurrency } from '@/utils/format-number';
import { Box, Card, CardContent, CardProps, CircularProgress, Stack, Typography } from '@mui/material';
import merge from 'lodash/merge';
import { IconifyIcon } from '../IconifyIcon';
import { Chart, useChart } from '../charts/Chart';

interface Props extends CardProps {
  title?: string;
  subTitle?: string;
  chart: {
    labels: string[];
    stacked?: boolean;
    series: {
      name: string;
      data: number[];
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
    forecastDataPoints?: {
      count?: number;
    };
  };
  isLoading?: boolean;
  isCurrency?: boolean;
  isPercentage?: boolean;
  current: {
    title?: string;
    value: number;
  };
  change?: number;
  changeText?: string;
}

export const RevenueChartWidget = ({
  title,
  subTitle,
  isLoading = false,
  isCurrency = true,
  isPercentage = false,
  chart,
  current,
  change,
  changeText,
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
      stacked: chart.stacked ?? true,
    },
    forecastDataPoints: {
      count: chart.forecastDataPoints?.count || 0,
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
          change && change < 0 ? 'solar:double-alt-arrow-down-bold-duotone' : 'solar:double-alt-arrow-up-bold-duotone'
        }
        sx={{ flexShrink: 0, color: 'success.main', ...(change && change < 0 && { color: 'error.main' }) }}
      />

      <Box component='span' sx={{ typography: 'subtitle2' }}>
        {change && change > 0 && '+'}
        {change && (isCurrency ? formatCurrency(change) : isPercentage ? change + '%' : change)}
      </Box>
      <Box component='span' sx={{ typography: 'body2', color: 'text.secondary' }}>
        {changeText || 'i dag'}
      </Box>
    </Box>
  );

  return (
    <Card {...other}>
      <CardContent>
        <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
          <Typography variant='h6'>{title}</Typography>
          {typeof change !== 'undefined' && renderTrending}
        </Stack>
        {subTitle && (
          <Typography variant='subtitle2' color='text.secondary' mb={2}>
            {subTitle}
          </Typography>
        )}
        <Stack spacing={3} flexDirection='row' alignItems='center' justifyContent='space-between' gap={3}>
          <Stack flexDirection='column'>
            <Typography variant='h4'>{isCurrency ? formatCurrency(current.value) : current.value}</Typography>
            <Typography color='grey.600' variant='subtitle2'>
              {current.title || 'Total'}
            </Typography>
          </Stack>
        </Stack>

        {!isLoading && chart.series.length <= 0 && (
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 250,
            }}
          >
            <CircularProgress size={20} color='inherit' />
          </Box>
        ) : (
          <Chart type='line' series={chart.series} options={options} height={250} width={'100%'} />
        )}
      </CardContent>
    </Card>
  );
};
