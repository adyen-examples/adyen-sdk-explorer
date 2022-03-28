import React from 'react';
import { PaymentsFormProps } from '../types';

const PaymentsForm = ({ options: { value, currency, countryCode, component }, onSubmit, onChange }: any) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return <div>PaymentForm</div>;
};

export default PaymentsForm;
