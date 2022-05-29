import { useSelector } from 'react-redux';
import { useInitializeCheckout } from '../../hooks';
import type { RootState } from '../../store';
import ConfigurationSession from '../ConfigurationSession';
import Component from './Component';
import RedirectComponent from './RedirectComponent';
import { useSearchParams } from 'react-router-dom';

const ComponentBase = () => {
  const { profile, global, local, sessions } = useSelector((state: RootState) => state.onDeck);
  const [queryParameters] = useSearchParams();
  const [data] = useInitializeCheckout({ payload: sessions, endpoint: 'sessions/sessionStart' });
  const redirectResult: any = queryParameters.get('redirectResult');
  let configuration = null;

  if(data) {
    configuration = new ConfigurationSession({ profile, global, local, sessions, data });
    if(redirectResult) {
      return <RedirectComponent configuration={configuration} redirectResult={redirectResult}/>;
    }
    return <Component configuration={configuration} />;
  }
  return <div>Loading...</div>;
};

export default ComponentBase;
