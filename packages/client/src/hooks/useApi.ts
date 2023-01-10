import { useState, useEffect } from 'react';
import { useAppDispatch } from '.';
import { descriptorsActions } from '../app';
import type { AllowedMethods, RequestOptions } from './types';

// Pass action as argument for dispatch callback?

const { updateDescriptors } = descriptorsActions;

export const useApi = (url: string, method: AllowedMethods = 'GET', apiKey: string = '', body?: any) => {
  const [data, setData] = useState<any>({
    state: 'LOADING',
    error: null,
    payload: null
  });
  const dispatch = useAppDispatch();

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
          payload: json
        }));
        dispatch(updateDescriptors(data));
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
  }, [url, method, apiKey, body, dispatch, data]);

  return [data];
};
