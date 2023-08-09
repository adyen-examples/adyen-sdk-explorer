import AdyenCheckout from '@adyen/adyen-web';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../app';
import type { ComponentConfig } from '../../components/ComponentBuilder';
import { ConfigurationSession } from '../../components/ComponentBuilder/ConfigurationSession';
import { API_URL, CLIENT_URL } from '../../config';
import { useAppDispatch } from '../../hooks';
import type { RootState } from '../../store';
import { useMemoCompare } from '../helpers/useMemoCompare';
import type { RequestOptions } from '../types';

const { updateSessionsResponseInfo, updateAdyenStateInfo } = onDeckActions;

export const useInitializeSession = ({ configuration, endpoint }: { configuration: ComponentConfig; endpoint: string }) => {
  const [checkout, setCheckout] = useState<any>(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const dispatch = useAppDispatch();
  const { activeStep, steps } = useSelector((state: RootState) => state.onDeck);

  const componentConfig = useMemoCompare(configuration);

  useEffect(() => {
    let ignore = false;
    const { sessions, txVariant } = componentConfig;
    const requestOptions: RequestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ...sessions, returnUrl: `${CLIENT_URL}/${txVariant}` })
    };
    const payloadSize = new TextEncoder().encode(requestOptions.body).length;
    const initialize: () => void = async () => {
      try {
        if (payloadSize > 1000000) {
          throw 'Error: Max payload size for /sessionStart is 2 mb. Please reduce the size of the payload.';
        }
        const response = await fetch(`${API_URL}/api/checkout/sessionStart`, requestOptions);
        const parsedResponse = await response.json();
        if (parsedResponse.error) {
          const errorMessage = parsedResponse.error;
          setError(errorMessage);
        } else if (!ignore) {
          const sessions = new ConfigurationSession({
            ...componentConfig,
            data: parsedResponse,
            setState: {
              error: setError,
              result: setResult,
              adyenState: (data: any) => {
                dispatch(updateAdyenStateInfo(data));
              }
            }
          });
          let component = await AdyenCheckout(sessions.checkoutConfig);
          localStorage.setItem('componentConfig', JSON.stringify(componentConfig));
          localStorage.setItem('sdkExplorer', JSON.stringify({ steps, activeStep }));
          setCheckout(component);
          dispatch(updateSessionsResponseInfo(parsedResponse));
        }
      } catch (e: any) {
        console.error('Catch error', e);
        setError(e);
        ignore = true;
      }
    };

    initialize();
    return () => {
      setCheckout(null);
      setError(null);
      setResult(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, endpoint, dispatch]);

  return [checkout, result, error];
};
