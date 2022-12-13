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

export const isEmpty = (x: object) => {
  return Object.keys(x).length === 0;
};

export const isConfigEmpty = (x: object) => {
  const emptyConfig = { checkout: {}, local: {}, sessions: {} };
  return deepEqual(emptyConfig, x);
};

export const deepEqual = (object1: any, object2: any) => {
  const isObject = (object: any) => {
    return object != null && typeof object === 'object';
  };

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false;
    }
  }
  return true;
};
