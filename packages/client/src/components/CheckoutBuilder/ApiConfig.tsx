import * as React from 'react';
import { useEffect, useState } from 'react';
import { getSessions_Response } from '../../helpers/payloadSamples';
import { CheckoutBuilderProps } from '../../types';
import EditOptions from './EditOptions';

const ApiConfig = (props: any) => {
  const { configuration, setConfiguration } = props;
  const { apiConfiguration } = configuration;
  const [configDictionary, setConfigDictionary]: any = useState({});

  useEffect(() => {
    if (typeof configuration === 'object') {
      addConfigurationList(getSessions_Response);
    }
  }, []);

  const addConfigurationList = (data: any) => {
    let updateOptionalConfigurations: any = {};
    for (const property in data) {
      if (!configuration[property]) {
        updateOptionalConfigurations[property] = new Object();
      }
    }
    updateOptionalConfigurations = {...configuration, ...updateOptionalConfigurations}
    setConfiguration(updateOptionalConfigurations);
    setConfigDictionary(data);
  };
  if (Object.keys(configDictionary).length > 0 && typeof configDictionary === 'object') {
    return (
      <React.Fragment>
        {Object.keys(configDictionary).map((category: any, i: any) => (
          <EditOptions
            configDictionary={{[category]:configDictionary[category]}}
            configuration={configuration}
            setConfiguration={setConfiguration}
          />
        ))}
      </React.Fragment>
    );
  }

  return <React.Fragment>Loading...</React.Fragment>;
};

export default ApiConfig;
