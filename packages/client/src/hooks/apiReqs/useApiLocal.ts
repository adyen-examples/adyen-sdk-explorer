import { useState, useEffect } from 'react';
import type { AllowedMethods, RequestOptions } from '../types';

export const useApiLocal = (url: string, method: AllowedMethods = 'GET', apiKey: string = '', body?: any) => {
  const [data, setData] = useState({});

  useEffect(() => {
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
        const data = await response.json();

        setData(data);
      } catch (err) {
        console.error(err);
      }
    };

    makeRequest();

    return () => {};
  }, [url, method, apiKey, body]);

  return [data];
};
