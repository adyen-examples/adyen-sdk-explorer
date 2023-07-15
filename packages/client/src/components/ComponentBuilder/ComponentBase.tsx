import { useSelector } from 'react-redux';
import { Component } from './Component';
import { RedirectComponent } from './RedirectComponent';
import type { RootState } from '../../store';

export const ComponentBase = () => {
  const { txVariant, checkout, local, sessions, isRedirect, style } = useSelector((state: RootState) => state.onDeck);
  const configuration = { txVariant, checkout, local, sessions, style };
  if (isRedirect) {
    return <RedirectComponent configuration={configuration} />;
  }

  return <Component configuration={configuration} />;
};
