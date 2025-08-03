import { Theme } from '@mui/material/styles';
import { buttonClasses } from '@mui/material/Button';
import { IconifyIcon } from '@/components/IconifyIcon';

// ----------------------------------------------------------------------

const dateList = [
  'DatePicker',
  'DateTimePicker',
  'StaticDatePicker',
  'DesktopDatePicker',
  'DesktopDateTimePicker',
  //
  'MobileDatePicker',
  'MobileDateTimePicker',
];

const timeList = ['TimePicker', 'MobileTimePicker', 'StaticTimePicker', 'DesktopTimePicker'];

const switchIcon = () => <IconifyIcon icon='eva:chevron-down-fill' fontSize={24} />;

const leftIcon = () => <IconifyIcon icon='eva:arrow-ios-back-fill' fontSize={24} />;

const rightIcon = () => <IconifyIcon icon='eva:arrow-ios-forward-fill' fontSize={24} />;

const calendarIcon = () => <IconifyIcon icon='solar:calendar-mark-bold-duotone' fontSize={24} />;

const clockIcon = () => <IconifyIcon icon='solar:clock-circle-outline' fontSize={24} />;

const desktopTypes = dateList.reduce((result: Record<string, any>, currentValue) => {
  result[`Mui${currentValue}`] = {
    defaultProps: {
      slots: {
        openPickerIcon: calendarIcon,
        leftArrowIcon: leftIcon,
        rightArrowIcon: rightIcon,
        switchViewIcon: switchIcon,
      },
    },
  };

  return result;
}, {});

const timeTypes = timeList.reduce((result: Record<string, any>, currentValue) => {
  result[`Mui${currentValue}`] = {
    defaultProps: {
      slots: {
        openPickerIcon: clockIcon,
        rightArrowIcon: rightIcon,
        switchViewIcon: switchIcon,
      },
    },
  };

  return result;
}, {});

export function datePicker(theme: Theme) {
  return {
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          '& .MuiPickersLayout-actionBar': {
            [`& .${buttonClasses.root}:last-of-type`]: {
              backgroundColor: theme.palette.text.primary,
              color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[800],
            },
          },
        },
      },
    },

    // Date
    ...desktopTypes,

    // Time
    ...timeTypes,
  };
}
