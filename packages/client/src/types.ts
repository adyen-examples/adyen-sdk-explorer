import React from 'react';

export type FormDataProps = {
  value: number;
  currency: string;
  countryCode: string;
  component?: string;
};

export type PaymentsFormProps = {
  options: FormDataProps;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type CheckoutBuilderProps = {
  configuration: {
    name: string;
    product: string;
    checkout_version: string;
    dropin_version: string;
    optionalConfiguration: any;
    apiConfiguration: any;
  };
  setConfiguration: any;
};

type SessionConfig = {
  merchantAccount: string;
  amount: {
    value: number;
    currency: string;
  };
  returnUrl: string;
  reference: string;
  countryCode: string;
};
