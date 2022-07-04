import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useInitializeCheckout } from '../../hooks';
import type { RootState } from '../../store';
import ConfigurationSession from './ConfigurationSession';
import Component from './Component';

const ComponentBase = () => {
  const { profile, checkout, local, sessions } = useSelector((state: RootState) => state.onDeck);
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult');
  const [data] = useInitializeCheckout({ payload: sessions, endpoint: 'sessions/sessionStart' });

  if (data) {
    if (data.error) {
      return <div>{JSON.stringify(data.error)}</div>;
    }
    let configuration = new ConfigurationSession({ profile, checkout, local, sessions, data });
    if (redirectResult) {
      return <div>Redirect Component</div>;
    }
    return <Component configuration={configuration} />;
  }

  return <div>Loading...</div>;
};

export default ComponentBase;
