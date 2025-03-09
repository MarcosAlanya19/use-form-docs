import React from 'react';
import { FormState } from 'react-hook-form';
import { IFormData } from '../../App';

interface IProps {
  label: string;
  formState: FormState<IFormData>;
}

export const FormStateDisplay: React.FC<IProps> = ({ label, formState }) => {
  const stateSnapshot = {
    isDirty: formState.isDirty,
    isValid: formState.isValid,
    isSubmitted: formState.isSubmitted,
    isSubmitting: formState.isSubmitting,
    isSubmitSuccessful: formState.isSubmitSuccessful,
    submitCount: formState.submitCount,
    touchedFields: formState.touchedFields,
    dirtyFields: formState.dirtyFields,
    defaultValues: formState.defaultValues,
    errors: Object.fromEntries(Object.entries(formState.errors).map(([key, value]) => [key, value.message])),
  };

  return (
    <div className='p-4 bg-gray-100 rounded-lg'>
      <h3 className='font-bold'>{label}</h3>
      <pre className='bg-white p-2 rounded shadow-sm overflow-auto'>{JSON.stringify(stateSnapshot, null, 2)}</pre>
    </div>
  );
};
