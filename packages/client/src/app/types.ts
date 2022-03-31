import type { PaymentAmount, PaymentMethodsResponseInterface } from '@adyen/adyen-web/dist/types/types';

export type ConfigurationState = {
  id: string;
  owner: string;
  name: string;
  version: number;
  configuration: string;
};

export type UserState = {
  id: string;
  username: string;
  configurations: [ConfigurationState] | [];
};

export type GlobalOnDeckState = {
  showPayButton: boolean;
  openFirstPaymentMethod: boolean;
  openFirstStoredPaymentMethod: boolean;
};

export type LocalOnDeckState = {
  amount: PaymentAmount;
  showPayButton: boolean;
};

export type SessionsOnDeckState = {
  expiresAt: string;
  countryCode: string;
  shopperLocale: string;
  shopperEmail: string;
  shopperReference: string;
};

export type OnDeckState = {
  global: GlobalOnDeckState | {};
  local: LocalOnDeckState | {};
  sessions: SessionsOnDeckState | {};
};

export type Descriptor = {
  name: string;
  description: string;
};

export type DescriptorList = {
  global: Descriptor[] | [];
  local: Descriptor[] | [];
  sessions: Descriptor[] | [];
  [key: string]: Descriptor[];
};
