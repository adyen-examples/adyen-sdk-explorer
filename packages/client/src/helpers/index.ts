import { FormDataProps } from '../components/types';

export const compareFormData = (prev: any, next: FormDataProps) => {
  if (!prev) {
    return false;
  }

  const valueMatch = prev.amount.value && prev.amount.value === next.amount.value;
  const currencyMatch = prev.amount.currency && prev.amount.currency === next.amount.currency;
  const countryCodeMatch = prev.countryCode && prev.countryCode === next.countryCode;

  return countryCodeMatch && currencyMatch && valueMatch;
};

export const compareSessionData = (prev: any, next: { sessionId: string }) => {
  if (!prev) {
    return false;
  }

  return prev.sessionId && prev.sessionId === next.sessionId;
};

export const compareCheckoutData = (prev: any, next: [any]) => {
  if (!prev) {
    return false;
  }

  const paymentMethodNames = next.map(pm => pm.name);

  return Array.isArray(prev) && Array.isArray(paymentMethodNames) && prev.every((name, i) => name === paymentMethodNames[i]);
};
