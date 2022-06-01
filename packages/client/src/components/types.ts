import { object } from 'prop-types';
import type {GlobalOnDeckState, LocalOnDeckState, ProfileOnDeckState, SessionsOnDeckState} from '../app/types'

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
  global:GlobalOnDeckState | {};
  local: LocalOnDeckState | {};
  profile: ProfileOnDeckState;
  data: any;
}

export interface ConfigurationSessionProps extends ConfigurationBaseProps {
  sessions: SessionsOnDeckState | {};
}
