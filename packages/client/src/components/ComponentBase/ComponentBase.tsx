import { useSelector } from 'react-redux';
import { useInitializeCheckout } from '../../hooks';
import type { RootState } from '../../store';
import ConfigurationSession from '../ConfigurationSession';
import Component from './Component';

const ComponentBase = () => {
  const { profile, global, local, sessions } = useSelector((state: RootState) => state.onDeck);
  const configuration = new ConfigurationSession({ profile, global, local, sessions });


  const { apiConfiguration, product, initEndpoint } = configuration;
  const [data] = useInitializeCheckout(apiConfiguration, product, initEndpoint);
  configuration.setData(data);

  // const [data] = useInitializeCheckout(configuration);

  if (data) {
    return <Component options={configuration} />;
  }
  return <div>Loading...</div>;
};

export default ComponentBase;
