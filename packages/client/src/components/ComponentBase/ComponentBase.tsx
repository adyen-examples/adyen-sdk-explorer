import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import Component from './Component';
import RedirectComponent from './RedirectComponent';

const ComponentBase = () => {
  const globalStateDeck = useSelector((state: RootState) => state.onDeck);
  const { profile, checkout, local, sessions, isRedirect } = globalStateDeck;
  const configuration = { profile, checkout, local, sessions };

  if (isRedirect) {
    return <RedirectComponent configuration={configuration} />;
  }

  return <Component configuration={configuration} />;
};

export default ComponentBase;
