import React from 'react';

interface IProps {
  label: string;
  data: unknown;
}

export const DataDisplay: React.FC<IProps> = ({ label, data }) => {
  return (
    <div className='p-4 bg-gray-100 rounded-lg'>
      <h3 className='font-bold'>{label}</h3>
      <pre className='bg-white p-2 rounded shadow-sm overflow-auto'>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
