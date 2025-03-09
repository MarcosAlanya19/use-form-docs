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

  const getFieldError = (name: Path<T>, errors: unknown): unknown => {
    if (typeof errors !== 'object' || errors === null) return undefined;

    return name.split('.').reduce<unknown>((acc, key) => {
      if (typeof acc === 'object' && acc !== null && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, errors);
  };

  const fieldError = getFieldError(name as Path<T>, errors) as { message?: string } | undefined;

  return (
    <div>
      <label className='block font-medium'>{label}:</label>
      <input {...register(name as Path<T>)} type='text' className='w-full p-2 border rounded' />
      {fieldError?.message && <p className='text-red-500 text-sm'>{fieldError.message}</p>}
    </div>
  );
};
