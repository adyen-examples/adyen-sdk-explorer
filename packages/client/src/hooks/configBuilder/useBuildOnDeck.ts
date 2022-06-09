import { useState, ChangeEvent } from 'react';
import type { OnDeckState } from '../../app/types';

type UpdateConfigNames = 'profile' | 'checkout' | 'local' | 'sessions';

export type UpdateConfig = (key: string, value: string | null) => void;

export type AddOrRemoveProp = (e: ChangeEvent<HTMLInputElement>, config: any, stateSetter: UpdateConfig) => void | undefined;

export const useBuildOnDeck = (currentConfig: OnDeckState) => {
  const [config, setConfig] = useState(currentConfig);

  const addOrRemoveProp: AddOrRemoveProp = (e, current, stateSetter): void => {
    const key = e.target.name;
    if (current && current.hasOwnProperty(key)) {
      stateSetter(key, null);
    } else {
      stateSetter(key, '');
    }
  };

  return {
    config
  };
};
