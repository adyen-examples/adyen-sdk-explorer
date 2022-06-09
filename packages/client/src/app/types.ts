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
  [key: string]: boolean;
};

export type LocalOnDeckState = {
  amount: PaymentAmount;
  showPayButton: boolean;
  [key: string]: PaymentAmount | boolean;
};

export type SessionsOnDeckState = {
  expiresAt: string;
  countryCode: string;
  shopperLocale: string;
  shopperEmail: string;
  shopperReference: string;
  [key: string]: string;
  amount: any;
};
export type OnDeckPropType = { [key: string]: any };

export type OnDeckState = {
  profile: OnDeckPropType;
  checkout: OnDeckPropType | {};
  local: OnDeckPropType | {};
  sessions: OnDeckPropType | {};
  [key: string]: any;
};

export type Descriptor = {
  name: string;
  description: string;
  properties?: [];
  items?: { type: string } | [];
  type?: string;
  format?: string;
  [key: string]: any;
};

export type DescriptorList = {
  checkout: Descriptor[] | [];
  local: Descriptor[] | [];
  sessions: Descriptor[] | [];
  [key: string]: Descriptor[] | [];
};
