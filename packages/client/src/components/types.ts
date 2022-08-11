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
  global:any;
  local: any;
  profile: any;
  data: any;
  queryParameters: any;
  setState: any;
  checkout: any;
}

export interface ConfigurationSessionProps extends ConfigurationBaseProps {
  sessions: any;
}
