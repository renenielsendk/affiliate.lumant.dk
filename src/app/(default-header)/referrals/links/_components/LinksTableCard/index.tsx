'use client';

import { TableBody, Box, TablePagination, Card, TableRow, TableCell, Typography, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useTable } from '@/components/table/use-table';
import { TableContainerCustom } from '@/components/table/TableContainerCustom';
import { TableHeadCustom } from '@/components/table/TableHeadCustom';
import { SaasAffiliateReferralLink } from '@prisma/client';
import { CopyLinkMenuItem } from './menu-items/CopyLinkMenuItem';
import { DotsMenuDropDown } from '@/components/menu/DotsMenuDropDown';

const TABLE_HEAD = [
  { id: 'createdAt', label: 'Dato', align: 'left' },
  { id: 'name', label: 'Navn', align: 'left' },
  { id: 'referralCode', label: 'Henvisningskode', align: 'left' },
  { id: 'actions', label: 'Handlinger', align: 'left' },
];

type Props = {
  affiliateLinks: SaasAffiliateReferralLink[];
};

export const LinksTableCard = ({ affiliateLinks }: Props) => {
  const { page, onChangePage, rowsPerPage } = useTable({ defaultRowsPerPage: 20 });

  return (
    <Stack>
      <Card>
        <TableContainerCustom>
          <TableHeadCustom headLabel={TABLE_HEAD} />
          <TableBody>
            {affiliateLinks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((link, index) => (
              <TableRow key={link.id || index}>
                <TableCell align='left'>
                  <Typography color='white' variant='body2' fontWeight={700}>
                    {dayjs(link.createdAt).format('MMM DD, YYYY')}
                  </Typography>
                </TableCell>
                <TableCell align='left'>
                  <Typography color='white' variant='body2' fontWeight={700}>
                    {link.name || '(Intet navn)'}
                  </Typography>
                </TableCell>
                <TableCell align='left'>
                  <Typography color='white' variant='body2' fontWeight={700}>
                    {link.referralCode}
                  </Typography>
                </TableCell>
                <TableCell align='left'>
                  <DotsMenuDropDown>
                    <CopyLinkMenuItem slug={link.referralCode} />
                  </DotsMenuDropDown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainerCustom>
        <Box sx={{ position: 'relative' }}>
          <TablePagination
            component='div'
            count={affiliateLinks?.length || 0}
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
