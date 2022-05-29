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
  
  if (queryParameters.get('redirectResult')) {
    // return <RedirectComponent configuration={{ profile global, local, sessions }} redirectInfo={redirectInfo} />;
    return <div>Loading...</div>;
  } else if (data) {
    console.log('dataa');
    
    const configuration = new ConfigurationSession({ profile, global, local, sessions, data });
    return <Component configuration={configuration} />;
  }

  return <div>Loading...</div>;
};

export default ComponentBase;
