import * as React from 'react';
import { useEffect, useState } from 'react';
import { getClientConfiguration_Response } from '../../helpers/payloadSamples';
import EditOptions from './EditOptions';

const OptionalConfig = (props: any) => {
  const { baseConfiguration, setBaseConfiguration } = props;
  const {configuration} = baseConfiguration;
  const [configDictionary, setConfigDictionary]: any = useState({});

  useEffect(() => {
    if (typeof configuration === 'object') {
      addConfigurationList(getClientConfiguration_Response);
    }
  }, []);

  const addConfigurationList = (data: any) => {
    for (const property in data) {
      if (!configuration.state[property]) {
        configuration.state = {[property]: new Object() }
      }
    }
    setBaseConfiguration({configuration});
    setConfigDictionary(data);
  };
  if (Object.keys(configDictionary).length > 0 && typeof configDictionary === 'object') {
    return (
      <React.Fragment>
        {Object.keys(configDictionary).map((category: any, i: any) => (
          <EditOptions
            configDictionary={{ [category]: configDictionary[category] }}
            key={i}
            baseConfiguration={baseConfiguration} 
            setBaseConfiguration={setBaseConfiguration}
          />
        ))}
      </React.Fragment>
    );
  }

  return <React.Fragment>Loading...</React.Fragment>;
};

export default OptionalConfig;
