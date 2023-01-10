import AdyenCheckout from '@adyen/adyen-web';
import { useEffect, useState } from 'react';
import type { CheckoutConfig } from '../types';

export const useCheckout = (configuration: any) => {
  const [checkout, setCheckout] = useState<any>(null);

  useEffect(() => {
    let checkoutOptions: CheckoutConfig = configuration.checkoutConfig;
    const initializeCheckout: (config: object) => void = async config => {
      const component = await AdyenCheckout(config);
      setCheckout(component);
    };

    initializeCheckout(checkoutOptions);
  }, [configuration]);

  return [checkout];
};
