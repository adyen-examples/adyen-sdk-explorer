import { prepareChallengeData } from '@adyen/adyen-web/dist/types/components/ThreeDS2/components/utils';
import { FormDataProps } from '../types';

export const compareFormData = (prev: any, next: FormDataProps) => {
    if (!prev) {
        return false;
    }

    const valueMatch = prev.value && prev.value === next.value;
    const currencyMatch = prev.currency && prev.currency === next.currency;
    const countryCodeMatch = prev.countryCode && prev.countryCode === next.countryCode;

    return countryCodeMatch && currencyMatch && valueMatch;
};

export const compareSessionData = (prev: any, next: { sessionId: string }) => {
    if (!prev) {
        return false;
    }

    return prev.sessionId && prev.sessionId === next.sessionId;
};
