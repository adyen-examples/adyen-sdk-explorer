import { useState, useEffect } from 'react';
import { useMemoCompare } from '../helpers/useMemoCompare';
import { compareFormData } from '../../helpers';
import type { InitializationRequest, RequestOptions } from '../types';

//options should be changed to initialization request
//before export const useInitializeCheckout = (options: any, component: string, endpoint: string) => {
export const useInitializeCheckout = (options: any, component: string, endpoint: string) => {
  const [checkoutResponse, setCheckoutResponse] = useState<any>(null);
  console.log('Starting useInitializeCheckout');
  
  // creates ref and uses data compare callback to decide if re-rendering should occur.  Without this, there is an infinite loop.
  // I think this is needed if you are listening to changes in the form data (aka options) because then we are comparing objects, which means we are passing
  // passing by reference, and that reference or pointer changes, although the object it points to doesnt change, and you get an infinite loop
  // We can bypass this by stringifying the opts object in the callback. 
  // Here is another way of doing it: https://stackoverflow.com/questions/54095994/react-useeffect-comparing-objects
  // Need a way to require fields, otherwise we will get an error. 
  const opts = useMemoCompare(options, compareFormData);

  useEffect(() => {
    const requestOptions: RequestOptions = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({'payload': options})
    };

    const initialize: () => void = async () => {
      console.log(endpoint);
      
      try {
        const response = await fetch(`http://localhost:8080/${endpoint}`, requestOptions);
        const parsed = await response.json();
        setCheckoutResponse(parsed);
      } catch (err) {
        if (err && typeof err === 'object') {
          console.error('Error', err);
        } else {
          console.error('Something went wrong');
        }
      }
    };

    initialize();
  }, [opts, endpoint]);

  return [checkoutResponse];
};
