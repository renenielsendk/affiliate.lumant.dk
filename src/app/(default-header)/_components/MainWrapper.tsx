import Box, { BoxProps } from '@mui/material/Box';

export const MainWrapper = ({ children, sx }: BoxProps) => {
  return (
    <Box
      component='main'
      sx={{
        minHeight: 1,
        pt: `65px`,
      }}
    >
      {children}
    </Box>
  );
};
