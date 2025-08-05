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

export const TransactionsTable = ({ transactions }: Props) => {
  const { page, onChangePage, rowsPerPage } = useTable({ defaultRowsPerPage: 20 });

  return (
    <Stack>
      <Card>
        <TableContainerCustom>
          <TableHeadCustom headLabel={TABLE_HEAD} />
          <TableBody>
            {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction, index) => (
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
                    color={getStatusColor(transaction.status)}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {transaction.status === SaasAffiliateTransactionStatus.PAID && 'Udbetalt'}
                    {transaction.status === SaasAffiliateTransactionStatus.AVAILABLE && 'Tilgængelig'}
                    {transaction.status === SaasAffiliateTransactionStatus.PENDING && 'Afventer'}
                  </Label>
                  {transaction.status === SaasAffiliateTransactionStatus.PENDING && (
                    <Typography fontSize={12} color='text.secondary' sx={{ mt: 0.5 }}>
                      {`Kan udbetales om ${Math.max(
                        0,
                        dayjs(transaction.createdAt).add(14, 'day').diff(dayjs(), 'day')
                      )} dage`}
                    </Typography>
                  )}
                  {transaction.status === SaasAffiliateTransactionStatus.AVAILABLE && (
                    <Typography fontSize={12} color='text.secondary' sx={{ mt: 0.5 }}>
                      Kan udbetales nu
                    </Typography>
                  )}
                </TableCell>
                <TableCell align='left'>
                  {transaction.paidAt ? (
                    <Typography fontSize={12} color='text.secondary'>
                      {dayjs(transaction.paidAt).format('DD. MMM YYYY')}
                    </Typography>
                  ) : (
                    <Typography fontSize={12} color='text.secondary'>
                      -
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
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

const getStatusColor = (status: SaasAffiliateTransactionStatus) => {
  switch (status) {
    case SaasAffiliateTransactionStatus.PAID:
      return 'success';
    case SaasAffiliateTransactionStatus.AVAILABLE:
      return 'warning';
    case SaasAffiliateTransactionStatus.PENDING:
      return 'error';
  }
};
