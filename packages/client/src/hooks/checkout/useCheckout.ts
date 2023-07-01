import AdyenCheckout from '@adyen/adyen-web';
import { useEffect, useState } from 'react';
import type { CheckoutConfig } from '../types';

export const useCheckout = (configuration: any) => {
  const [checkout, setCheckout] = useState<any>(null);

  useEffect(() => {
    let ignore = false;
    const checkoutOptions: CheckoutConfig = configuration.checkoutConfig;
    const initializeCheckout: (config: object) => void = async config => {
      const component = await AdyenCheckout(config);
      if (!ignore) {
        setCheckout(component);
      }
    };

    initializeCheckout(checkoutOptions);
    return () => {
      setCheckout(null);
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [checkout];
};
