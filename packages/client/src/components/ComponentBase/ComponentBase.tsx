import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useInitializeCheckout } from '../../hooks';
import type { RootState } from '../../store';
import ConfigurationSession from '../ConfigurationSession';
import Component from './Component';

const ComponentBase = () => {
  const { profile, checkout, local, sessions } = useSelector((state: RootState) => state.onDeck);
  const [values, setError] = useState({ error: false, code: '', message: '' });
  const { error, code, message } = values;
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult');
  const [data] = useInitializeCheckout({ payload: sessions, endpoint: 'sessions/sessionStart' });
  let configuration: any = null;

console.log(
  'profile, checkout, local, sessions',profile, checkout, local, sessions
);


  if (error) {
    return <div>Error Component</div>;
  } else if (redirectResult) {
    configuration = new ConfigurationSession({ profile, checkout, local, sessions });
    return <div>Redirect Component</div>;
  } else if (data) {
    configuration = new ConfigurationSession({ profile, checkout, local, sessions, data });
    return <Component configuration={configuration} />;
  }

  return <div>Loading...</div>;
};

export default ComponentBase;
