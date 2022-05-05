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

export type Configurations = {
  globalConfigOptions?: object;
  localConfigOptions?: object;
  sessions?: object;
  paymentMethods?: object;
  payments?: object;
  paymentDetails?: object;
};

export interface AdyenConfiguration {
  globalConfigOptions: object;
  localConfigOptions: object;
  session: {id:string, data: string};

  name?: string;
  amount?: number;
  clientKey?: string;

  onChange: (state: any, element: object) => void;
  onValid: (state: any, element: object) => void;
  beforeSubmit: (state: any, element: object, actions: any) => Promise<void>;
  onSubmit: (state: any, element: object) => void;
  onComplete: (state: any, element: object) => void;
  onAdditionalDetails: (state: any, element: object) => void;
  onError: (error: Error, element?: object) => void;
  onPaymentCompleted: (result: any, element: object) => void;
}

export interface BaseConfigurationProps {
  name?: string;
  product?: 'dropin' | 'card';
  componentLibrary?: 'v5.11.0';
  checkoutLibrary?: 'v68';
}

export interface SessionConfigurationProps extends BaseConfigurationProps {
  sessionsRequestOptions?: object;
}
