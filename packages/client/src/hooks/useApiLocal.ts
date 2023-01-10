import { useState, useEffect } from 'react';
import type { AllowedMethods, RequestOptions } from './types';

export const useApiLocal = (url: string, method: AllowedMethods = 'GET', apiKey: string = '', body?: any) => {
  const [data, setData] = useState<any>({
    state: 'SUCCESS',
    error: null,
    data: null
  });

  useEffect(() => {
    setData((prevState: any) => ({
      ...prevState,
      state: 'LOADING'
    }));

    const requestOptions: RequestOptions = {
      method,
      headers: {
        'Content-type': 'application/json',
        Authorization: apiKey
      }
    };

    if (body && method !== 'GET') {
      requestOptions.body = body;
    }

    const makeRequest: () => void = async () => {
      try {
        const response = await fetch(url, requestOptions);
        const json = await response.json();
        console.log(json);
        setData((prevState: any) => ({
          ...prevState,
          state: 'SUCCESS',
          data: json
        }));
      } catch (err) {
        console.error(err);
        setData((prevState: any) => ({
          ...prevState,
          state: 'ERROR',
          error: 'fetch failed'
        }));
      }
    };

    makeRequest();
  }, [url, method, apiKey, body]);

  return [data];
};
