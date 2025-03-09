import { useFieldArray, useFormContext } from 'react-hook-form';
import { IFormData } from '../../App';
import { Checkbox } from '../checkbox';
import { Input } from '../input';
import { Select } from '../select';

interface IProps {
  onSubmit: () => void;
}

export const Form: React.FC<IProps> = ({ onSubmit }) => {
  const methods = useFormContext<IFormData>();
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'addresses',
  });

  const { errors } = methods.formState;

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <Input<IFormData> label='Nombre' name='name' />
      <Input<IFormData> label='Correo Electrónico' name='email' />
      <Select<IFormData> label='País' name='country' />
      {fields.map((field, index) => (
        <div key={field.id} className='mb-4 p-3 border rounded'>
          <Input label='Calle' name={`addresses.${index}.street`} />
          <Input label='Ciudad' name={`addresses.${index}.city`} />
          <button type='button' onClick={() => remove(index)} className='mt-2 px-4 py-2 bg-red-500 text-white rounded'>
            Eliminar
          </button>
        </div>
      ))}

      <div>
        <button type='button' onClick={() => append({ street: '', city: '' })} className=' px-4 py-2 bg-blue-500 text-white rounded'>
          Agregar Dirección
        </button>
        {errors.addresses?.root && <p className='text-red-500 text-sm'>{String(errors.addresses?.root?.message)}</p>}
      </div>

      <Checkbox<IFormData> label='Acepto los términos y condiciones' name='acceptTerms' />
      <Checkbox<IFormData> label='Modo Oscuro' name='darkMode' />
      <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'>
        Enviar
      </button>
    </form>
  );
};
