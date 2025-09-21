import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import { ReactElement, ReactNode, createContext, useContext, useRef } from 'react';
import { DefaultValues, FieldValues, FormProvider as Form, UseFormReturn, useForm, Resolver } from 'react-hook-form';
import { ZodType } from 'zod';

export type OutputProps<T extends FieldValues> = {
  formContext: UseFormReturn<T, any>;
  isSubmitting: boolean;
  formRef: React.RefObject<HTMLFormElement>;
};

const FormContext = createContext<OutputProps<any> | null>(null);

type InputProps<T extends FieldValues> = {
  children: ReactNode;
  defaultValues?: DefaultValues<T>;
  validationSchema?: ZodType<T, any, any>;
  onSubmit: (data: T) => Promise<any>;
  onSubmitSuccessMessage?: string;
  clearValuesOnSubmit?: boolean;
};

function FormProvider<T extends FieldValues>({
  children,
  defaultValues,
  validationSchema,
  onSubmit,
  onSubmitSuccessMessage,
  clearValuesOnSubmit = false,
}: InputProps<T>): ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const formRef = useRef<HTMLFormElement>(null);

  const resolver: Resolver<T, any, T> | undefined = validationSchema
    ? zodResolver(validationSchema as ZodType<T, any, any>)
    : undefined;

  const formContext = useForm<T>({
    resolver,
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = formContext;

  const onFormSubmit = async (data: T) => {
    try {
      await onSubmit(data);
      if (clearValuesOnSubmit) {
        reset();
      }

      if (onSubmitSuccessMessage) {
        enqueueSnackbar(onSubmitSuccessMessage);
      }
    } catch (error) {
      console.error(error);
      // https://github.com/vercel/next.js/issues/73317
      // enqueueSnackbar('An error happened, please try again or contact support.', { variant: 'error' });
    }
  };

  return (
    <FormContext.Provider value={{ formContext, isSubmitting, formRef }}>
      <Form {...formContext}>
        <form ref={formRef} style={{ position: 'relative', width: '100%' }} onSubmit={handleSubmit(onFormSubmit)}>
          {children}
        </form>
      </Form>
    </FormContext.Provider>
  );
}

const useFormContext = <T extends FieldValues>() => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context as OutputProps<T>;
};

export { FormProvider, FormContext, useFormContext };
