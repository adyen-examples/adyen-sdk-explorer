import { useState, useEffect } from 'react';
import { descriptorsActions } from '../app';
import type { AllowedMethods, RequestOptions } from './types';

export const useApiLocal = (url: string, method: AllowedMethods = 'GET', apiKey: string = '', body?: any) => {
  const [data, setData] = useState<any>({
    state: 'LOADING',
    error: null,
    data: null
  });

  const setPartialData = (partialData: any) => setData({ ...data, ...partialData });

  useEffect(() => {
    setPartialData({
      state: 'LOADING'
    });

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
        console.log(data);
        setPartialData({
          state: 'SUCCESS',
          data
        });
      } catch (err) {
        console.error(err);
        setPartialData({
          state: 'ERROR',
          error: 'fetch failed'
        });
      }
    };

    makeRequest();
  }, [url, method, apiKey, body]);

  return [data];
};
