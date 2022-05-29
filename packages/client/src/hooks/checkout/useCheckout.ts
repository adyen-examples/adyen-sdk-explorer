import { useState, useEffect } from 'react';
import AdyenCheckout from '@adyen/adyen-web';
import { useMemoCompare } from '../helpers/useMemoCompare';
import { compareCheckoutData } from '../../helpers';
import type { CheckoutConfig, EditableCheckoutConfigFields } from '../types';

//options: EditableCheckoutConfigFields
export const useCheckout = (options: any) => {
  const [checkout, setCheckout] = useState<any>(null);
  const {global, session} = options;
  // creates ref and uses data compare callback to decide if re-rendering should occur.  Without this, there is an infinite loop.
  // const opts = useMemoCompare(options, compareCheckoutData);
  // I modified this to remove the comparison and only mount 
  
  console.log('options from useCheckout hook', options);
  
  useEffect(() => {
    let configuration: CheckoutConfig;
    if (options.session) {
      configuration = {
        ...global,
        session,
        onPaymentCompleted: (result, component) => {
          console.info(result, component);
        },
        onError: (error, component) => {
          console.error(error.name, error.message, error.stack, component);
        },
        clientKey: "test_QFGJGRQZERFWNFYWKEZSQL3E342QEDNU",
        environment: "test"
      };
    } else {
      configuration = {
        ...options,
        onSubmit: (state, dropin) => {
          console.info(state, dropin);
        },
        onChange: (state, dropin) => {
          console.info(state, dropin);
        },
        onAdditionalDetails: (state, dropin) => {
          console.info(state, dropin);
        },
        onError: error => {
          console.error(error.name, error.message, error.stack);
        }
      };
    }
  
    const initializeCheckout: (config: object) => void = async config => {
      const component = await AdyenCheckout(config);
      setCheckout(component);
    };

    console.log('initializing with this configuration', configuration);
    
    initializeCheckout({});
  }, []);
  console.log('this is the checkout',checkout);
  
  return [checkout];
};
