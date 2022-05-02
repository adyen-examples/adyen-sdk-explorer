import type { PaymentAmount } from '@adyen/adyen-web/dist/types/types';

export interface BaseAdyenRequest {
  version: string;
  apiKey?: string;
}

export interface InitializationRequest extends BaseAdyenRequest {
  payload: {
    merchantAccount: string;
    amount: PaymentAmount;
    returnUrl: string;
    reference: string;
    expiresAt?: string;
    countryCode?: string;
    shopperLocale?: string;
    shopperEmail?: string;
    shopperIP?: string;
    shopperReference?: string;
  };
}

export interface RequestOptions {
  url: string;
  headers: {
    'Content-type': string;
    'x-api-key': string;
  };
  body: any;
  json: boolean;
}

export type { PaymentAmount };
