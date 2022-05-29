import { useSelector } from 'react-redux';
import { useInitializeCheckout } from '../../hooks';
import type { RootState } from '../../store';
import ConfigurationSession from '../ConfigurationSession';
import Component from './Component';

const RedirectComponent = () => {
  const { profile, global, local, sessions } = useSelector((state: RootState) => state.onDeck);
  
  const [data] = useInitializeCheckout({ payload: sessions, endpoint: '/sessions/sessionStart' });
  const configuration = new ConfigurationSession({ profile, global, local, sessions, data });

  if (data) {
    return <Component configuration={configuration} />;
  }

  return <div>Loading...</div>;
};

export default RedirectComponent;
