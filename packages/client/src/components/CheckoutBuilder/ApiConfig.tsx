import * as React from 'react';
import EditOptions from './EditOptions';
import { CheckoutBuilderProps } from '../../types';
import { payload } from '../../helpers/payloadSamples';
import { useEffect, useState } from 'react';

const ApiConfig = (props: CheckoutBuilderProps) => {
  const { configuration, setConfiguration } = props;
  const { optionalConfiguration } = configuration;
  const [configDictionary, setConfigDictionary]: any = useState({});

  useEffect(() => {
    // need a hook to fetch the payload, need a function to process the payload and create new object

    if (typeof optionalConfiguration === 'object') {
      addConfigurationList(payload);
    }
  }, []);

  const addConfigurationList = (payload: any) => {
    // You will add this to a class that instatiates a configuration profile
    //For now just get the configDictionary, it will not be a hook

    let updateOptionalConfigurations: any = {};
    for (const property in payload) {
      if (!optionalConfiguration[property]) {
        updateOptionalConfigurations[property] = new Object();
      }
    }
    updateOptionalConfigurations = {...updateOptionalConfigurations, ...optionalConfiguration}
    setConfiguration({ ...configuration, optionalConfiguration: updateOptionalConfigurations });
    setConfigDictionary(payload);
  };
  if (Object.keys(configDictionary).length > 0 && typeof configDictionary === 'object') {
    return (
      <React.Fragment>
        {Object.keys(configDictionary).map((category: any, i: any) => (
          <EditOptions
            configDictionary={{ [category]: configDictionary[category] }}
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
