import { useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../app';
import { getClientConfiguration_Response } from '../../helpers/payloadSamples';
import EditOptions from './EditOptions';

import type { RootState } from '../../store';

const OptionalConfig = (props: any) => {
  const { configuration, setConfiguration } = props;
  const descriptors = useSelector((state: RootState) => state.descriptor);
  const configDictionary = ['global', 'local'];

  console.log(descriptors);

  useEffect(() => {
    if (typeof configuration === 'object') {
      addConfigurationList(getClientConfiguration_Response);
    }
  }, []);

  const addConfigurationList = (payload: any) => {
    let updateOptionalConfigurations: any = {};
    for (const property in payload) {
      if (!configuration[property]) {
        updateOptionalConfigurations[property] = new Object();
      }
    }
    updateOptionalConfigurations = { ...configuration, ...updateOptionalConfigurations };
    setConfiguration(updateOptionalConfigurations);
  };
  if (configDictionary.length > 0) {
    return (
      <Fragment>
        {configDictionary.map((category: string, i: number) => (
          <EditOptions
            configDictionary={{ [category]: descriptors[category] }}
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

export default OptionalConfig;
