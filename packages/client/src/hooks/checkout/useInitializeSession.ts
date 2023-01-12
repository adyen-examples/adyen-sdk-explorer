import AdyenCheckout from '@adyen/adyen-web';
import { useEffect, useState } from 'react';
import ConfigurationSession from '../../components/ComponentBase/ConfigurationSession';
import { API_URL, CLIENT_URL } from '../../config';
import type { RequestOptions } from '../types';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { onDeckActions } from '../../app';
import { useAppDispatch } from '../../hooks';

export const useInitializeSession = ({ configuration, endpoint }: { configuration: any; endpoint: string }) => {
  const [checkout, setCheckout] = useState<any>(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const { updateSessionsResponseInfo } = onDeckActions;
  const dispatch = useAppDispatch();

  const { sessions, profile } = configuration;
  const txvariant = profile.product;

  const { steps } = useSelector((state: RootState) => state.sdkExplorer);
  const { activeStep } = useSelector((state: RootState) => state.onDeck);

  useEffect(() => {
    const requestOptions: RequestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ...sessions, returnUrl: `${CLIENT_URL}/${txvariant}` })
    };
    const initialize: () => void = async () => {
      try {
        const response = await fetch(`${API_URL}/${endpoint}`, requestOptions);
        const parsedResponse = await response.json();
        if (parsedResponse.error) {
          const errorMessage = parsedResponse.error;
          setError(errorMessage);
        } else {
          const sessions = new ConfigurationSession({ ...configuration, data: parsedResponse, setState: { error: setError, result: setResult } });
          let component = await AdyenCheckout(sessions.checkoutConfig);
          localStorage.setItem('configuration', JSON.stringify(configuration));
          localStorage.setItem('sdkExplorer', JSON.stringify({ steps, activeStep }));
          setCheckout(component);
          dispatch(updateSessionsResponseInfo(parsedResponse));
        }
      } catch (e: any) {
        console.error('Catch error', e);
        setError(e);
      }
    };

    initialize();
  }, []);

  return [checkout, result, error];
};
