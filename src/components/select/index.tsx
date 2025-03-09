import { Path, useFormContext } from 'react-hook-form';

interface IProps<T extends Record<string, unknown>> {
  label: string;
  name: keyof T;
}

export const Select = <T extends Record<string, unknown>>({ label, name }: IProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div>
      <label className='block font-medium'>{label}:</label>
      <select {...register(name as Path<T>)} className='w-full p-2 border rounded'>
        <option value=''>Seleccione...</option>
        <option value='us'>Estados Unidos</option>
        <option value='mx'>México</option>
        <option value='es'>España</option>
      </select>
      {errors[name as string] && <p className='text-red-500 text-sm'>{String(errors[name as string]?.message)}</p>}
    </div>
  );
};
