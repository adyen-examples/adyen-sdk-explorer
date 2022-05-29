import { useState, useEffect } from 'react';
import AdyenCheckout from '@adyen/adyen-web';
import { compareCheckoutData } from '../../helpers';
import type { CheckoutConfig, EditableCheckoutConfigFields } from '../types';

export const useCheckout = (options: any) => {
  const [checkout, setCheckout] = useState<any>(null);
  
  useEffect(() => {
    let configuration: CheckoutConfig;
    configuration = options.CheckoutConfig;
    
    const initializeCheckout: (config: object) => void = async config => {
      console.log('config abaout to be initd', config);
      const component = await AdyenCheckout(config);
      setCheckout(component);
    };

    initializeCheckout(configuration);
  }, []);
  
  return [checkout];
};
