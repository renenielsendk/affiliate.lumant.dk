'use client';

import { TableBody, Box, TablePagination, Card, TableRow, TableCell, Typography, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { ReferralListItem } from './types';
import { useTable } from '@/components/table/use-table';
import { TableContainerCustom } from '@/components/table/TableContainerCustom';
import { TableHeadCustom } from '@/components/table/TableHeadCustom';
import { Label } from '@/components/Label';
import { SaasAffiliateReferralConversionType, SaasAffiliateReferralStatus } from '@prisma/client';

const TABLE_HEAD = [
  { id: 'createdAt', label: 'Dato', align: 'left' },
  { id: 'name', label: 'Navn', align: 'left' },
  { id: 'subscription', label: 'Produkt', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
];

type Props = {
  referrals: ReferralListItem[];
};

export const ReferralsTable = ({ referrals }: Props) => {
  const { page, onChangePage, rowsPerPage } = useTable({ defaultRowsPerPage: 20 });

  return (
    <Stack>
      <Card>
        <TableContainerCustom>
          <TableHeadCustom headLabel={TABLE_HEAD} />
          <TableBody>
            {referrals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((referral, index) => (
              <TableRow key={index}>
                <TableCell align='left'>
                  <Typography color='white' variant='body2' fontWeight={700}>
                    {dayjs(referral.createdAt).format('MMM DD, YYYY')}
                  </Typography>
                </TableCell>
                <TableCell align='left'>
                  <Typography color='white' variant='body2' fontWeight={700}>
                    {referral.name || '(Intet navn)'}
                  </Typography>
                  <Typography fontSize={14} color='text.secondary'>
                    {referral.email}
                  </Typography>
                </TableCell>
                <TableCell align='left'>
                  <Label variant='outlined' sx={{ textTransform: 'capitalize' }}>
                    {referral.conversionType === SaasAffiliateReferralConversionType.YEARLY_SUBSCRIPTION &&
                      'Købt årligt'}
                    {referral.conversionType === SaasAffiliateReferralConversionType.MONTHLY_SUBSCRIPTION &&
                      'Købt månedligt'}
                    {referral.conversionType === SaasAffiliateReferralConversionType.NOT_CONVERTED &&
                      'Ikke konverteret'}
                  </Label>
                </TableCell>
                <TableCell align='left'>
                  <Label
                    variant='ghost'
                    color={referral.status === SaasAffiliateReferralStatus.CONVERTED ? 'success' : 'warning'}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {referral.status === SaasAffiliateReferralStatus.INVITED && 'Inviteret'}
                    {referral.status === SaasAffiliateReferralStatus.TRIALING && 'Prøveperiode'}
                    {referral.status === SaasAffiliateReferralStatus.CONVERTED && 'Konverteret'}
                  </Label>
                  {referral.status === SaasAffiliateReferralStatus.TRIALING && referral.trialExpiresAt && (
                    <Typography fontSize={12} color='text.secondary' sx={{ mt: 0.5 }}>
                      Udløber om {dayjs(referral.trialExpiresAt).diff(dayjs(), 'day')} dage
                    </Typography>
                  )}
                  {referral.status === SaasAffiliateReferralStatus.CONVERTED && (
                    <Typography fontSize={12} color='text.secondary' sx={{ mt: 0.5 }}>
                      {dayjs(referral.convertedAt).format('MMM DD, YYYY')}
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
            count={referrals?.length || 0}
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
