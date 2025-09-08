'use client';

import { TableBody, Box, TablePagination, Card, TableRow, TableCell, Typography, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { SaasAffiliateTransaction, SaasAffiliateTransactionStatus } from '@prisma/client';
import { useTable } from '@/components/table/use-table';
import { TableContainerCustom } from '@/components/table/TableContainerCustom';
import { TableHeadCustom } from '@/components/table/TableHeadCustom';
import { Label } from '@/components/Label';
import { formatCurrency } from '@/utils/format-number';

const TABLE_HEAD = [
  { id: 'createdAt', label: 'Dato', align: 'left' },
  { id: 'text', label: 'Beskrivelse', align: 'left' },
  { id: 'netAmount', label: 'Nettobeløb', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'paidAt', label: 'Udbetalingsdato', align: 'left' },
];

type Props = {
  transactions: SaasAffiliateTransaction[];
};

function isPending(transaction: SaasAffiliateTransaction) {
  // Only AVAILABLE can be pending, and only if not 14 days old
  if (transaction.status !== SaasAffiliateTransactionStatus.AVAILABLE) return false;
  const daysSinceCreated = dayjs().diff(dayjs(transaction.createdAt), 'day');
  return daysSinceCreated < 14;
}

function getStatusLabel(transaction: SaasAffiliateTransaction) {
  if (transaction.status === SaasAffiliateTransactionStatus.PAID) {
    return 'Udbetalt';
  }
  if (transaction.status === SaasAffiliateTransactionStatus.AVAILABLE) {
    if (isPending(transaction)) {
      return 'Afventer';
    }
    return 'Tilgængelig';
  }
  return '';
}

function getStatusColor(transaction: SaasAffiliateTransaction) {
  if (transaction.status === SaasAffiliateTransactionStatus.PAID) {
    return 'success';
  }
  if (transaction.status === SaasAffiliateTransactionStatus.AVAILABLE) {
    if (isPending(transaction)) {
      return 'error';
    }
    return 'warning';
  }
  return 'default';
}

export const TransactionsTable = ({ transactions }: Props) => {
  const { page, onChangePage, rowsPerPage } = useTable({ defaultRowsPerPage: 20 });

  return (
    <Stack>
      <Card>
        <TableContainerCustom>
          <TableHeadCustom headLabel={TABLE_HEAD} />
          <TableBody>
            {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction, index) => {
              const pending = isPending(transaction);
              return (
                <TableRow key={transaction.id || index}>
                  <TableCell align='left'>
                    <Typography color='white' variant='body2' fontWeight={700}>
                      {dayjs(transaction.createdAt).format('DD. MMM YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography color='white' variant='body2'>
                      {transaction.text}
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography color='white' variant='body2' fontWeight={700}>
                      {formatCurrency(transaction.netAmount)}
                    </Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Label
                      variant='ghost'
                      color={getStatusColor(transaction)}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {getStatusLabel(transaction)}
                    </Label>
                    {transaction.status === SaasAffiliateTransactionStatus.AVAILABLE && pending && (
                      <Typography fontSize={12} color='text.secondary' sx={{ mt: 0.5 }}>
                        {`Kan udbetales om ${Math.max(
                          0,
                          14 - dayjs().diff(dayjs(transaction.createdAt), 'day')
                        )} dage`}
                      </Typography>
                    )}
                    {transaction.status === SaasAffiliateTransactionStatus.AVAILABLE && !pending && (
                      <Typography fontSize={12} color='text.secondary' sx={{ mt: 0.5 }}>
                        Kan udbetales nu
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align='left'>
                    {transaction.paidAt ? (
                      <Typography color='white' variant='body2'>
                        {dayjs(transaction.paidAt).format('DD. MMM YYYY')}
                      </Typography>
                    ) : (
                      <Typography color='white' variant='body2'>
                        -
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableContainerCustom>
        <Box sx={{ position: 'relative' }}>
          <TablePagination
            component='div'
            count={transactions?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            rowsPerPageOptions={[]}
            labelDisplayedRows={({ from, to, count }) => {
              return '' + from + '-' + to + ' af ' + count;
            }}
          />
        </Box>
      </Card>
    </Stack>
  );
};
