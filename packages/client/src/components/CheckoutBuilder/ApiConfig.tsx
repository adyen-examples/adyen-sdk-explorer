import * as React from 'react';
import { useEffect, useState } from 'react';
import { getSessions_Response } from '../../helpers/payloadSamples';
import EditOptions from './EditOptions';

const ApiConfig = (props: any) => {
  const { baseConfiguration, setBaseConfiguration } = props;
  const { configuration } = baseConfiguration;

  const [configDictionary, setConfigDictionary]: any = useState({});

  useEffect(() => {
    if (typeof configuration === 'object') {
      addConfigurationList(getSessions_Response);
    }
  }, []);

  const addConfigurationList = (data: any) => {
    for (const property in data) {
      if (!configuration.state[property]) {
        configuration.state = { [property]: new Object() };
      }
    }
    setBaseConfiguration({ configuration });
    setConfigDictionary(data);
  };
  if (Object.keys(configDictionary).length > 0 && typeof configDictionary === 'object') {
    return (
      <React.Fragment>
        {Object.keys(configDictionary).map((category: any, i: any) => (
          <EditOptions
            configDictionary={{ [category]: configDictionary[category] }}
            baseConfiguration={baseConfiguration} 
            setBaseConfiguration={setBaseConfiguration}
            key={i}
          />
        ))}
      </React.Fragment>
    );
  }

  return <React.Fragment>Loading...</React.Fragment>;
};

export default ApiConfig;
