import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useInitializeCheckout } from '../../hooks';
import { InitializationRequest } from '../../hooks/types';
import Component from './Component';
import { useLocation } from 'react-router-dom';
import type { RootState } from '../../store';

// TODO: Get information from global state and render correct component
const ComponentBase = () => {
  const { profile, global, local, sessions } = useSelector((state: RootState) => state.onDeck);

  const params = useParams();
  const component = params.component;
  const [checkoutInfo] = useInitializeCheckout(sessions, component, 'sessions/sessionStart');

  // Here we are going to create the class and add all of the callbacks
  if (checkoutInfo && component) {
    return <Component type={component} options={{global,local,session: {id: checkoutInfo.id, sessionData: checkoutInfo.sessionData}}} />;
  }
  return <div>Loading...</div>;
};

export default ComponentBase;
