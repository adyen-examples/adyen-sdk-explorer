import { useParams } from 'react-router-dom';
import { useInitializeCheckout } from '../../hooks';
import { InitializationRequest } from '../../hooks/types';
import Component from './Component';
import { useLocation } from 'react-router-dom';

// TODO: Get information from global state and render correct component
const ComponentBase = () => {
  // const params = useParams();
  // const component = params.component;
  // const [checkoutInfo] = useInitializeCheckout(options, component, endpoint);
  // const { state } = useLocation();
  // console.log(state);

  // if (checkoutInfo && component) {
  //   return <Component type={component} options={checkoutInfo} />;
  // }
  return <div>Loading...</div>;
};

export default ComponentBase;
