import { Box, Card, CardProps, CircularProgress, Typography } from '@mui/material';
import { IconifyIcon } from '@/components/IconifyIcon';
import { formatCurrency } from '@/utils/format-number';

interface Props extends CardProps {
  title: string;
  total: number;
  change: number;
  isCurrency?: boolean;
  isLoading?: boolean;
  isPercentage?: boolean;
}

export const KeyMetricWidget = ({ title, change, total, sx, isCurrency, isLoading, isPercentage, ...other }: Props) => {
  const renderNumber = () => {
    if (isCurrency) {
      return formatCurrency(total);
    }
    if (isPercentage) {
      return total.toFixed(2) + '%';
    }
    return total;
  };

  const renderTrending = (
    <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
      <IconifyIcon
        width={24}
        icon={change < 0 ? 'solar:double-alt-arrow-down-bold-duotone' : 'solar:double-alt-arrow-up-bold-duotone'}
        sx={{ flexShrink: 0, color: 'success.main', ...(change < 0 && { color: 'error.main' }) }}
      />

      <Box component='span' sx={{ typography: 'subtitle2' }}>
        {change > 0 && '+'}
        {isCurrency ? formatCurrency(change) : isPercentage ? change + '%' : change}
      </Box>
      <Box component='span' sx={{ typography: 'body2', color: 'text.secondary' }}>
        i dag
      </Box>
    </Box>
  );

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 3,
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h5'>{title}</Typography>
        <Box sx={{ mt: 1.5, mb: 1, typography: 'h3' }}>
          {isLoading ? <CircularProgress size={24} /> : renderNumber()}
        </Box>
        {renderTrending}
      </Box>
    </Card>
  );
};
