import { useState } from 'react';
import type { OnDeckState } from '../../app/types';

type UpdateConfigArgs = {
  name: 'profile' | 'global' | 'local' | 'sessions';
  key: string;
  value: string;
};

export const useBuildOnDeck = (config: OnDeckState) => {
  const [newConfig, setNewConfig] = useState(config);

  const updateConfig = ({ name, key, value }: UpdateConfigArgs) => {
    const objectOfInterest = newConfig[name];
    const objectToUpdate = { ...objectOfInterest, [key]: value };
    setNewConfig(prevState => ({
      ...prevState,
      [name]: objectToUpdate
    }));
  };

  return {
    newConfig,
    updateConfig
  };
};
