import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { globalConfigOptions } from '../../../helpers/payloadSamples';
import Editor from './Editor';
import ListOptions from './ListOptions';

const OptionalConfig = () => {
  // So create one component, and one hook that initializes them
  // We are going to have to create a collection of properties, with the type so that we can throw errors if they dont match
  //This should just be rewritten as a hook that fetches data and imported into the list options component
  const [globalValues, setGlobalValues] = useState<object[]>([]);
  const [checkedGlobal, setGlobalChecked] = useState({});

  const [values, setValues] = useState({
    error: '',
    success: ''
  });
  const { error, success } = values;

  // Need to create api that fetches the configuration
  useEffect(() => {
    initGlobal('dropin');
  }, []);
  const initGlobal = (product: any) => {
    //Here we should fetch our data and add error handling
    setGlobalValues(globalConfigOptions);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <ListOptions options={globalValues} enabledOptions={checkedGlobal} updateEnabledOptions={setGlobalChecked} />
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={3}>
            <Grid item sx={{ height: '100%' }} xs={12}>
              <Editor enabledOptions={checkedGlobal} updateEnabledOptions={setGlobalChecked} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OptionalConfig;
