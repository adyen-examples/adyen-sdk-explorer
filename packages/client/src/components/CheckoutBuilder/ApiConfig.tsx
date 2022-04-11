import { useEffect, useState, Fragment } from 'react';
import { getSessions_Response } from '../../helpers/payloadSamples';
import EditOptions from './EditOptions';
import type { Descriptor } from '../../app/types';

const ApiConfig = ({
  configDictionary,
  configuration,
  setConfiguration
}: {
  configDictionary: Descriptor[];
  configuration: { [key: string]: any };
  setConfiguration: (config: {}) => void;
}) => {
  if (Object.keys(configDictionary).length > 0 && typeof configDictionary === 'object') {
    return (
      <Fragment>
        {Object.keys(configDictionary).map((category: any, i: any) => (
          <EditOptions
            configDictionary={{ [category]: configDictionary[category] }}
            configuration={configuration}
            setConfiguration={setConfiguration}
            key={i}
          />
        ))}
      </Fragment>
    );
  }

  return <Fragment>Loading...</Fragment>;
};

export default ApiConfig;
