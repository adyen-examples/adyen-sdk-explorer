import { useState, useEffect } from 'react';
import type { AllowedMethods, RequestOptions } from '../types';

interface DataState {
  state: string;
  error?: any;
  data?: any;
}

// moved outside of hook to avoid infinite re-renders and an accurate dependency array

const setPartialData = (partialData: DataState, callback: Function) =>
  callback((prevState: DataState) => ({
    ...prevState,
    ...partialData
  }));

export const useApiLocal = (url: string, method: AllowedMethods = 'GET', apiKey: string = '', body?: any) => {
  const [data, setData] = useState<DataState>({
    state: 'LOADING',
    error: null,
    data: null
  });

  useEffect(() => {
    setPartialData(
      {
        state: 'LOADING'
      },
      setData
    );

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
        setPartialData(
          {
            state: 'SUCCESS',
            data
          },
          setData
        );
      } catch (err) {
        console.error(err);
        setPartialData(
          {
            state: 'ERROR',
            error: 'fetch failed'
          },
          setData
        );
      }
    };

    makeRequest();
  }, [url, method, apiKey, body]);

  return [data];
};
