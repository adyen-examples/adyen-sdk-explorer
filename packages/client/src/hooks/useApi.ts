import { useState, useEffect } from 'react';
import { useAppDispatch } from '.';
import { descriptorsActions } from '../app';
import type { AllowedMethods, RequestOptions } from './types';

const { updateDescriptors } = descriptorsActions;

export const useApi = (url: string, method: AllowedMethods = 'GET', apiKey: string = '', body?: any) => {
  const [data, setData] = useState<any>({
    state: 'LOADING',
    error: null,
    data: null
  });
  const dispatch = useAppDispatch();
  const setPartData = (partialData: any) => setData({ ...data, ...partialData });

  useEffect(() => {
    setPartData({
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
        setPartData({
          state: 'SUCCESS',
          data
        });
        dispatch(updateDescriptors(data));
      } catch (err) {
        console.error(err);
        setPartData({
          state: 'ERROR',
          error: 'fetch failed'
        });
      }
    };

    makeRequest();
  }, [url, method, apiKey, body]);

  return [data];
};
