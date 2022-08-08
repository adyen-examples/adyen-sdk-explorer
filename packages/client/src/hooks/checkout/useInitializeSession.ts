import AdyenCheckout from '@adyen/adyen-web';
import { useEffect, useState } from 'react';
import ConfigurationSession from '../../components/ComponentBase/ConfigurationSession';
import { API_URL, CLIENT_URL } from '../../config';
import type { RequestOptions } from '../types';

export const useInitializeSession = ({ configuration, endpoint }: { configuration: any; endpoint: string }) => {
  const [values, setCheckout] = useState<any>({ checkout: null, error: null });
  const { checkout, error } = values;
  const { sessions } = configuration;

  useEffect(() => {
    const requestOptions: RequestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ...sessions, returnUrl: `${CLIENT_URL}/` })
    };
    const initialize: () => void = async () => {
      try {
        const response = await fetch(`${API_URL}/${endpoint}`, requestOptions);
        const parsedResponse = await response.json();
        if (parsedResponse.error) {
          const errorMessage = parsedResponse.error;
          setCheckout({ checkout: null, error: errorMessage });
        } else {
          console.log('Configuration in useInitializeSession', configuration);
          const sessions = new ConfigurationSession({...configuration,data: parsedResponse});
          const component = await AdyenCheckout(sessions.checkoutConfig);
          localStorage.setItem('configuration', JSON.stringify(configuration));
          setCheckout({ checkout: component, error: null });
        }
      } catch (e) {
        console.error('Error', e);
        // setCheckoutResponse({ error: { errorType: 'network', message: 'Network Error', status: '500', errorCode: '502' } });
      }
    };

    initialize();
  }, []);

  return [checkout, error];
};
