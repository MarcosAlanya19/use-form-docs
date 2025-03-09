/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DataDisplay } from './components/data-display';
import { Form } from './components/form';
import { FormStateDisplay } from './components/form-data-display';

const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  country: yup.string().required('Selecciona un país'),
  acceptTerms: yup.boolean().oneOf([true], 'Debes aceptar los términos'),
  darkMode: yup.boolean(),
});

export type IFormData = yup.InferType<typeof schema>;
type IFormMode = 'onSubmit' | 'onBlur' | 'onChange' | 'all';

const App = () => {
  const [mode] = React.useState<IFormMode>('onChange');
  const [submittedData, setSubmittedData] = React.useState<IFormData | null>(null);
  const [disabled, setDisabled] = React.useState(false);

  const methods = useForm<IFormData>({
    mode: mode,
    resolver: yupResolver(schema),
    disabled,
    defaultValues: async () => {
      try {
        setDisabled(true);
        const response = await new Promise<IFormData>((resolve) =>
          setTimeout(
            () =>
              resolve({
                name: 'Juan Pérez',
                email: 'juan@example.com',
                country: 'mx',
                acceptTerms: true,
                darkMode: false,
              }),
            2000
          )
        );
        setDisabled(false);
        return response;
      } catch (error) {
        toast.error('Error al cargar los datos');
        throw error;
      }
    },
  });

  const onSubmit: SubmitHandler<IFormData> = async () => {
    setDisabled(true);
    const toastId = toast.loading('Enviando formulario...');

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmittedData(methods.getValues());

      toast.dismiss(toastId);
      toast.success('Formulario enviado con éxito');
    } catch (error) {
      console.error(error);

      toast.dismiss(toastId);
      toast.error('Error al enviar el formulario');
    } finally {
      setDisabled(false);
    }
  };

  React.useEffect(() => {
    if (!disabled) {
      methods.setFocus('name');
    }
  }, [disabled]);

  return (
    <div className='grid grid-cols-[1fr_1fr] gap-6 justify-items-center min-h-screen bg-gray-50 p-6'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-lg'>
        <h2 className='text-xl font-bold text-center mb-4'>Formulario Accesible</h2>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)} />
        </FormProvider>

        <div className='flex gap-2 mt-4'>
          {['onSubmit', 'onBlur', 'onChange', 'all'].map((m) => (
            <div key={m} className={`px-4 py-2 rounded ${mode === m ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {m}
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 w-full max-w-3xl'>
        <FormStateDisplay label='Estados del formulario' formState={methods.formState} />
        <DataDisplay label='Data en tiempo real' data={methods.watch()} />
        <DataDisplay label='Data enviada' data={submittedData} />
      </div>
    </div>
  );
};

export default App;
