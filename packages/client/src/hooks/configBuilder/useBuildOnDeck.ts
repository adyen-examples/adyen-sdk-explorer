import { useState } from 'react';
import type { OnDeckState } from '../../app/types';
import type { ConfigTypes } from '../../components/CheckoutBuilder/types';

type UpdateConfigNames = 'profile' | 'global' | 'local' | 'sessions';

export const useBuildOnDeck = (currentConfig: OnDeckState) => {
  const [config, setConfig] = useState(currentConfig);

  const updateConfig = (name: UpdateConfigNames, key: string, value: string | null) => {
    const objectOfInterest = config[name];
    let objectToUpdate: ConfigTypes;
    if (value === null && config.hasOwnProperty(key)) {
      objectToUpdate = { ...config };
      delete objectToUpdate[key];
    } else {
      objectToUpdate = { ...objectOfInterest, [key]: value };
    }
    setConfig(prevState => ({
      ...prevState,
      [name]: objectToUpdate
    }));
  };

  return {
    config,
    updateConfig
  };
};
