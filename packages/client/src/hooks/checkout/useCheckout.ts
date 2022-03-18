import { useState, useEffect } from 'react';
import AdyenCheckout from '@adyen/adyen-web';
import { useMemoCompare } from '../helpers/useMemoCompare';
import { compareCheckoutData } from '../../helpers';
import type { CheckoutConfig, EditableCheckoutConfigFields } from '../types';

export const useCheckout = (options: EditableCheckoutConfigFields) => {
  const [checkout, setCheckout] = useState<any>(null);

  // creates ref and uses data compare callback to decide if re-rendering should occur.  Without this, there is an infinite loop.
  const opts = useMemoCompare(options, compareCheckoutData);

  useEffect(() => {
    let configuration: CheckoutConfig;
    if (options.session) {
      configuration = {
        ...options,
        onPaymentCompleted: (result, component) => {
          console.info(result, component);
        },
        onError: (error, component) => {
          console.error(error.name, error.message, error.stack, component);
        }
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

    initializeCheckout(configuration);
  }, [opts]);

  return [checkout];
};
