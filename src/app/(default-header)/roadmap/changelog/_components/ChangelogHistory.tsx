import { Card, CardContent, CardHeader, Divider, Stack, Typography, Box } from '@mui/material';
import { changeLog } from './change-log';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const ChangelogHistory = () => {
  return (
    <Stack spacing={3}>
      {changeLog.map((item, index) => (
        <Card key={index}>
          <CardHeader title={dayjs(item.date, 'DD/MM/YYYY').format('DD MMM YY')} sx={{ mb: 2 }} />
          <Divider />
          <CardContent>
            <Stack spacing={3}>
              {item.improvements && item.improvements.length > 0 && (
                <Box>
                  <Typography variant='h6' gutterBottom>
                    Forbedringer
                  </Typography>
                  <Box component='ul' sx={{ pl: 4 }}>
                    {item.improvements.map((change, changeIndex) => (
                      <Box component='li' key={changeIndex} sx={{ mb: 1 }}>
                        <Typography variant='body1'>{change}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
              {item.bugs && item.bugs.length > 0 && (
                <Box>
                  <Typography variant='h6' gutterBottom>
                    Fejlrettelser
                  </Typography>
                  <Box component='ul' sx={{ pl: 4 }}>
                    {item.bugs.map((bug, bugIndex) => (
                      <Box component='li' key={bugIndex} sx={{ mb: 1 }}>
                        <Typography variant='body1'>{bug}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
