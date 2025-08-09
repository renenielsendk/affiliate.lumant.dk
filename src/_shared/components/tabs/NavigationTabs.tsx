'use client';

import { Box, Stack, Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/navigation';
import { IconifyIcon } from '../IconifyIcon';

type Props = {
  children: React.ReactElement;
  currentTab: string;
  tabs: { value: string; label: string; icon: string; disabled?: boolean }[];
  rootUrl: string;
};

export const NavigationTabs = ({ children, currentTab, tabs, rootUrl }: Props) => {
  const { push } = useRouter();

  return (
    <Stack spacing={3}>
      <Tabs
        allowScrollButtonsMobile
        variant='scrollable'
        scrollButtons='auto'
        value={currentTab}
        onChange={(event: React.SyntheticEvent<Element, Event>, newValue: string) => {
          push(`${rootUrl}/${newValue}`);
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            disableRipple
            key={index}
            label={tab.label}
            sx={{ cursor: tab.disabled ? 'not-allowed' : 'pointer' }}
            icon={<IconifyIcon icon={tab.icon} width={20} height={20} />}
            value={tab.value}
            disabled={tab.disabled}
          />
        ))}
      </Tabs>
      <Box>{children}</Box>
    </Stack>
  );
};
