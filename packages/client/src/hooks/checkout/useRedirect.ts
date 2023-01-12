import AdyenCheckout from '@adyen/adyen-web';
import { useEffect, useState } from 'react';
import { compareSessionData } from '../../helpers';
import { useMemoCompare } from '../helpers/useMemoCompare';
import type { CheckoutConfig, EditableCheckoutConfigFields } from '../types';

export const useRedirect = (options: EditableCheckoutConfigFields) => {
  const [checkout, setCheckout] = useState<any>(null);

  // creates ref and uses data compare callback to decide if re-rendering should occur.  Without this, there is an infinite loop.
  const opts = useMemoCompare(options, compareSessionData);

  // TODO: This config will be brought in from front end. Add as argument above
  useEffect(() => {
    const { session: sessionInfo, redirectResult } = options;

    let session;

    if (redirectResult && redirectResult.redirectSessionId) {
      session = { id: redirectResult.redirectSessionId };
    } else if (sessionInfo) {
      session = sessionInfo;
    }

    const configuration: CheckoutConfig = {
      ...options,
      ...session,
      onPaymentCompleted: (result, component) => {
        console.info(result, component);
      },
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
      }
    };

    const initializeCheckout: (config: object) => void = async config => {
      const component = await AdyenCheckout(config);
      if (redirectResult && redirectResult.redirectResult && redirectResult.redirectSessionId) {
        component.submitDetails({
          details: { redirectResult: redirectResult.redirectResult }
        });
      }

      setCheckout(component);
    };

    initializeCheckout(configuration);
  }, [opts]);

  return [checkout];
};
