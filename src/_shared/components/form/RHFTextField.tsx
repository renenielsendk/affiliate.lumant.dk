'use client';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { FormHelperText, Stack, Typography } from '@mui/material';

type Props = TextFieldProps & {
  name: string;
  nullOnEmpty?: boolean;
  label?: string;
  hideTopLabel?: boolean;
};

export const RHFTextField = ({ name, helperText, type, nullOnEmpty, label, hideTopLabel = false, ...other }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack spacing={0.5} flexGrow={1}>
          {!hideTopLabel && label && (
            <Stack>
              <Typography lineHeight={1.4} fontWeight={700} variant='body2'>
                {label}
              </Typography>
              {helperText && (
                <Typography lineHeight={1.4} color='text.secondary' variant='body2'>
                  {helperText}
                </Typography>
              )}
            </Stack>
          )}
          <TextField
            {...field}
            fullWidth
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                const value = event.target.value;
                if (nullOnEmpty && value === '') {
                  field.onChange(null);
                } else {
                  field.onChange(Number(value));
                }
              } else {
                field.onChange(event.target.value);
              }
            }}
            error={!!error}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            {...other}
            variant='filled'
            size='small'
          />
          {error && (
            <FormHelperText error sx={{ fontSize: '0.875rem' }}>
              {error?.message}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  );
};
