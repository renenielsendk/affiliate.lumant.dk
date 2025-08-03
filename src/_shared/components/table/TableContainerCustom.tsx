import { TableContainerProps, TableContainer, Table } from '@mui/material';
import { Scrollbar } from '../Scrollbar';
import LoadingSpinnerWithWrap from '@/components/LoadingSpinnerWithWrap';

interface Props extends TableContainerProps {
  size?: 'small' | 'medium';
  isLoading?: boolean;
}

export const TableContainerCustom = ({ size = 'medium', isLoading, children, sx }: Props) => {
  return (
    <Scrollbar>
      {isLoading && <LoadingSpinnerWithWrap />}
      <TableContainer
        sx={{
          ...sx,
          height: isLoading ? 200 : 'auto',
        }}
      >
        <Table size={size}>{children}</Table>
      </TableContainer>
    </Scrollbar>
  );
};
