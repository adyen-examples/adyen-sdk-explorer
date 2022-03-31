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

  if (configDictionary.length > 0) {
    return (
      <Fragment>
        {configDictionary.map((category: string, i: number) => (
          <EditOptions configDictionary={{ [category]: descriptors[category] }} key={i} />
        ))}
      </Fragment>
    );
  }

  return <Fragment>Loading...</Fragment>;
};

export default OptionalConfig;
