import type { PaymentAmount } from '@adyen/adyen-web/dist/types/types';

export interface InitializationRequest {
  merchantAccount: string;
  amount: PaymentAmount;
  returnUrl: string;
  reference: string;
  expiresAt?: Date;
  countryCode?: string;
  shopperLocale?: string;
  shopperEmail?: string;
  shopperIP?: string;
  shopperReference?: string;
}

export interface PaymentMethodProps {
  name: string;
  type?: string;
  description?: string;
  defaultValue?: any;
  [key: string]: any;
}

export interface PaymentMethodPropsList {
  [key: string]: PaymentMethodProps[];
}

export type { PaymentAmount };
