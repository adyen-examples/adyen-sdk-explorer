import { object } from 'prop-types';
import { useEffect, useState } from 'react';

const useBuildConfigs = (config: {}) => {
  const [newConfig, setNewConfig] = useState(config);

  useEffect(() => {}, [config]);
};
