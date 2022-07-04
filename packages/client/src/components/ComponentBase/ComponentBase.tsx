import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useInitializeCheckout } from '../../hooks';
import type { RootState } from '../../store';
import ConfigurationSession from './ConfigurationSession';
import Component from './Component';
import RedirectComponent from './RedirectComponent';

const ComponentBase = () => {
  const { profile, checkout, local, sessions } = useSelector((state: RootState) => state.onDeck);
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult'),
    sessionId: any = queryParameters.get('sessionId'),
    serialConfig: any = queryParameters.get('config');
  const [data] = useInitializeCheckout({ payload: { profile, checkout, local, sessions }, endpoint: 'sessions/sessionStart' });
  let configuration = null;

  if (redirectResult && serialConfig && sessionId) {
    configuration = new ConfigurationSession({
      ...JSON.parse(serialConfig),
      queryParameters: { redirectResult: redirectResult, sessionId: sessionId }
    });
    return <RedirectComponent configuration={configuration} />;
  }

  if (data) {
    if (data.error) {
      return <div>{JSON.stringify(data.error)}</div>;
    }
    configuration = new ConfigurationSession({ profile, checkout, local, sessions, data });
    return <Component configuration={configuration} />;
  }

  return <div>Loading...</div>;
};

export default ComponentBase;
