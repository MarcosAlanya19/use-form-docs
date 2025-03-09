import { Path, useFormContext } from 'react-hook-form';

interface IProps<T extends Record<string, unknown>> {
  label: string;
  name: keyof T;
}

export const Checkbox = <T extends Record<string, unknown>>({ label, name }: IProps<T>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className='flex items-center'>
      <input {...register(name as Path<T>)} type='checkbox' className='mr-2' />
      <label>{label}</label>
      {errors[name as string] && <p className='text-red-500 text-sm'>{String(errors[name as string]?.message)}</p>}
    </div>
  );
};
