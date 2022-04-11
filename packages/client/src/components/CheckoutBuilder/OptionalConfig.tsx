import { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import EditOptions from './EditOptions';
import { NavButtons } from './NavButtons';
import type { ConfigPropTypes } from './types';

import type { RootState } from '../../store';

type OptionalConfigType = {
  global: {};
  local: {};
  [key: string]: {};
};

const OptionalConfig = ({ step, setActiveStep, descriptors }: ConfigPropTypes) => {
  const [config, setConfig] = useState<OptionalConfigType>({
    global: {},
    local: {}
  });
  const configDictionary = ['global', 'local'];

  console.log('OPTIONAL DESCRIPTORS', descriptors);

  const handleConfigUpdate = (e: any) => {
    const { name, value } = e.target;
    const updateObj = Object.assign({}, config[name], value);
    setConfig(prevState => ({
      ...prevState,
      [name]: updateObj
    }));
  };

  if (configDictionary.length > 0 && descriptors) {
    return (
      <Fragment>
        {configDictionary.map((category: string, i: number) => {
          console.log('TO BE PASSED', config, category, config[category]);
          return <EditOptions configDictionary={descriptors[category]} configuration={config[category]} setConfiguration={handleConfigUpdate} />;
        })}
        <NavButtons step={step} setActiveStep={setActiveStep} configuration={config} />
      </Fragment>
    );
  }

  return <Fragment>Loading...</Fragment>;
};

export default OptionalConfig;
