import { IFormData } from '../../App';
import { Checkbox } from '../checkbox';
import { Input } from '../input';
import { Select } from '../select';

interface IProps {
  onSubmit: () => void;
}

export const Form: React.FC<IProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <Input<IFormData> label='Nombre' name='name' />
      <Input<IFormData> label='Correo Electrónico' name='email' />
      <Select<IFormData> label='País' name='country' />
      <Checkbox<IFormData> label='Acepto los términos y condiciones' name='acceptTerms' />
      <Checkbox<IFormData> label='Modo Oscuro' name='darkMode' />
      <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'>
        Enviar
      </button>
    </form>
  );
};
