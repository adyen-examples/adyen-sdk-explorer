import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useInitializeCheckout } from '../../hooks';
import { InitializationRequest } from '../../hooks/types';
import Component from './Component';
import { useLocation } from 'react-router-dom';
import type { RootState } from '../../store';
import ConfigurationSession from '../ConfigurationSession';

const ComponentBase = () => {
  const { profile, global, local, sessions } = useSelector((state: RootState) => state.onDeck);
  const configuration = new ConfigurationSession({ profile, global, local, sessions });
  const [test] = useInitializeCheckout(configuration.apiConfiguration, configuration.product, configuration.initClientAPI);

  configuration.data = test;
  console.log('configuration test',configuration.data);
  console.log('test',test)
  if (configuration) {
    return (
      <Component type={configuration.product} options={{ global, local, session: { id: configuration.data.id, sessionData: configuration.data.sessionData } }} />
    );
  }
  return <div>Loading...</div>;
};

export default ComponentBase;
