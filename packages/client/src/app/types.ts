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

export type ProfileOnDeckState = {
  name: string;
  product: string;
  checkoutVersion: string;
  dropinVersion: string;
};

export type GlobalOnDeckState = {
  showPayButton: boolean;
  openFirstPaymentMethod: boolean;
  openFirstStoredPaymentMethod: boolean;
  [key: string]: any;
};

export type LocalOnDeckState = {
  amount: PaymentAmount;
  showPayButton: boolean;
  [key: string]: any;
};

export type SessionsOnDeckState = {
  expiresAt: string;
  countryCode: string;
  shopperLocale: string;
  shopperEmail: string;
  shopperReference: string;
  [key: string]: any;
};

export type OnDeckState = {
  profile: ProfileOnDeckState;
  optional: {
    global: GlobalOnDeckState;
    local: LocalOnDeckState;
  };
  sessions: SessionsOnDeckState;
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
