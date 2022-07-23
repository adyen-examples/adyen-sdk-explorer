import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useInitializeCheckout } from '../../hooks';
import type { RootState } from '../../store';
import ConfigurationSession from './ConfigurationSession';
import Component from './Component';
import RedirectComponent from './RedirectComponent';
import { deepEqual, isConfigEmpty } from '../../helpers';

const ComponentBase = () => {
  const globalStateDeck = useSelector((state: RootState) => state.onDeck);
  const { profile, checkout, local, sessions } = globalStateDeck;
  let configuration = null;

  //Maintain local storage state
  // const [localStorageState, setLocalStorageState] = useState<any>(null);
  // The better plan is to keep all this in a redirect component and another in a component

  //sessions call
  const [data] = useInitializeCheckout({ payload: { profile, checkout, local, sessions }, endpoint: 'sessions/sessionStart' });

  //Handle Redirect
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult'),
    sessionId: any = queryParameters.get('sessionId');

  console.log('Local storage configuration: ', localStorage.getItem('configuration'));

  if (localStorage.getItem('configuration')) {
    const storedConfig: any = { profile, checkout, local, sessions };
    localStorage.removeItem('configuration');
    configuration = new ConfigurationSession({
      ...storedConfig,
      queryParameters: { redirectResult: redirectResult, sessionId: sessionId }
    });
    console.log('redirect flow: configuration', configuration);
    return <RedirectComponent configuration={configuration} />;
  }

  //Non redirect flow
  if (data) {
    if (data.error) {
      return <div>{JSON.stringify(data.error)}</div>;
    }
    //you only set if there is a redirect, add it to a callback for a redirect
    localStorage.setItem('configuration', JSON.stringify({ profile, checkout, local, sessions }));
    configuration = new ConfigurationSession({ profile, checkout, local, sessions, data });
    console.log('non redirect flow: configuration', configuration);

    return <Component configuration={configuration} />;
  }

  return <div>Loading...</div>;
};

export default ComponentBase;
