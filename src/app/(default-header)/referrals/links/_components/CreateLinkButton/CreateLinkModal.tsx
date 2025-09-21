import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, DialogActions, InputAdornment, Stack } from '@mui/material';
import { FormProvider } from '@/providers/FormProvider';
import { createLink } from './create-link';
import { SubmitButton } from '@/components/form/SubmitButton';
import { RHFTextField } from '@/components/form/RHFTextField';
import { z } from 'zod';
import slug from 'slug';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  affiliateName: string;
  totalLinks: number;
};

export const schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Feltet skal angives' })
    .max(110, { message: 'Feltet er begrænset til højst 110 tegn' }),
  referralCode: z
    .string()
    .min(1, { message: 'Feltet skal angives' })
    .max(110, { message: 'Feltet er begrænset til højst 110 tegn' }),
});

type FormProps = z.infer<typeof schema>;

export const CreateLinkModal = ({ open, onClose, affiliateName, totalLinks }: Props) => {
  const onSubmit = async (data: FormProps) => {
    await createLink({ name: data.name, referralCode: data.referralCode });
    onClose();
  };

  const defaultLinkSlug = `${slug(affiliateName, { lower: true })}-${totalLinks + 1}`;

  return (
    <Dialog open={open} onClose={onClose}>
      <FormProvider<FormProps>
        defaultValues={{ name: '', referralCode: defaultLinkSlug }}
        validationSchema={schema}
        onSubmit={onSubmit}
        onSubmitSuccessMessage='Linket blev oprettet.'
      >
        <DialogTitle>Opret nyt henvisningslink</DialogTitle>
        <DialogContent sx={{ minWidth: 600 }}>
          <Stack spacing={3}>
            <RHFTextField name='name' label='Navn' placeholder='Indtast navn' />
            <RHFTextField
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position='end'>https://lumant.dk/p/</InputAdornment>,
                },
              }}
              name='referralCode'
              label='Henvisningskode'
              placeholder='Indtast henvisningskode (f.eks. mit-link)'
              helperText='Denne kode er det som indegår i linket'
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant='outlined' color='inherit'>
            Afbryd
          </Button>
          <SubmitButton icon='mdi:plus'>Opret link</SubmitButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
