import { useSelector } from 'react-redux';
import { Component } from './Component';
import { RedirectComponent } from './RedirectComponent';
import type { RootState } from '../../store';

export const ComponentBase = () => {
  const globalStateDeck = useSelector((state: RootState) => state.onDeck);
  const { profile, checkout, local, sessions, isRedirect, style } = globalStateDeck;
  const configuration = { profile, checkout, local, sessions, style };

  if (isRedirect) {
    return <RedirectComponent configuration={configuration} />;
  }

  return <Component configuration={configuration} />;
};
