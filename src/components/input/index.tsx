import { Path, useFormContext } from 'react-hook-form';

interface IProps<T extends Record<string, unknown>> {
  label: string;
  name: keyof T;
}

export const Input = <T extends Record<string, unknown>>({ label, name }: IProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div>
      <label className='block font-medium'>{label}:</label>
      <input {...register(name as Path<T>)} type='text' className='w-full p-2 border rounded' />
      {errors[name as string] && <p className='text-red-500 text-sm'>{String(errors[name as string]?.message)}</p>}
    </div>
  );
};
