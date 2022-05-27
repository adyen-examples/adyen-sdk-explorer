import { object } from 'prop-types';

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

export interface ConfigurationBaseProps {
  global: any;
  local: any;
  profile: {
    checkoutVersion: string;
    dropinVersion: string;
    name: string;
    product: string;
  };
}

export interface ConfigurationSessionProps extends ConfigurationBaseProps {
  sessions: object;
}
