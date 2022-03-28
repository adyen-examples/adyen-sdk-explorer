import { useParams } from 'react-router-dom';
import { useInitializeCheckout } from '../../hooks';
import { InitializationRequest } from '../../hooks/types';
import Component from './Component';

const ComponentBase = (options: InitializationRequest, endpoint: string) => {
  const params = useParams();
  const component = params.component;
  const [checkoutInfo] = useInitializeCheckout(options, component, endpoint);
  if (checkoutInfo && component) {
    return <Component type={component} options={checkoutInfo} />;
  }
  return <div>Loading...</div>;
};

export default ComponentBase;
