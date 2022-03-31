import type { PaymentAmount, PaymentMethodsResponseInterface } from '@adyen/adyen-web/dist/types/types';

export type InitializationRequest = {
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
};

export interface EditableCheckoutConfigFields {
  session?: {
    id: string;
    data?: string;
  };
  paymentMethodsResponse?: PaymentMethodsResponseInterface;
  redirectResult?: {
    redirectResult: string;
    redirectSessionId: string;
  };
  environment: string;
  clientKey: string;
  paymentMethodsConfiguration?: object;
  amount?: PaymentAmount;
  showPayButton?: boolean;
}

export interface CheckoutConfig extends EditableCheckoutConfigFields {
  onChange?: (state: any, element: any) => void;
  onValid?: (state: any, element: any) => void;
  onSubmit?: (state: any, element: any) => void;
  onComplete?: (state: any, element: any) => void;
  onAdditionalDetails?: (state: any, element: any) => void;
  onError?: (error: any, element?: any) => void;
  onPaymentCompleted?: (result: any, element: any) => void;
}

export type RequestOptions = {
  method: string;
  headers: {
    'Content-type': string;
    Authorization?: string;
  };
  body?: string;
};

export type AllowedMethods = 'GET' | 'POST' | 'PUT';

export { PaymentAmount, PaymentMethodsResponseInterface };
