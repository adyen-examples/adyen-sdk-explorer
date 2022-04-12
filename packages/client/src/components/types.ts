export type FormDataProps = {
  amount: {
    value: number;
    currency: string;
  };
  countryCode: string;
  endpoint?: string;
  component?: string;
};

export type PaymentsFormProps = {
  options: FormDataProps;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type BaseConfigurationProps = {
  name?: string;
  product?: 'dropin' | 'card';
  componentLibrary?: 'v5.11.0';
  checkoutLibrary?: 'v68';
}

export type Configurations = {
  globalConfigOptions?: object;
  localConfigOptions?: object;
  sessions?: object;
  paymentMethods? : object;
  payments?: object;
  paymentDetails?: object;
}

