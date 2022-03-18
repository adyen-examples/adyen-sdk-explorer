import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { globalConfigOptions } from '../../../helpers/payloadSamples';
import Editor from './Editor';
import ListOptions from './ListOptions';

const EditOptions = (props: any) => {
  //We need to remake configs as a custom hook that we can use across the components to se the list and handle an error
  // Need to create api that fetches the configuration
  // We are going to have to create a collection of properties, with the type so that we can throw errors if they dont match
  //This should just be rewritten as a hook that fetches data and imported into the list options component
  const [configs, setConfigs] = useState<object[]>([]);
  useEffect(() => {
    setConfigs(globalConfigOptions);
  }, []);

  const [enabledConfigs, setEnabledConfigs] = useState({});

  return (
    <React.Fragment>
      <Typography variant="h6">Global Parameters</Typography>
      <Divider />
      <Grid mt={2} container>
        <Grid item xs={7}>
          <ListOptions options={configs} enabledOptions={enabledConfigs} updateEnabledOptions={setEnabledConfigs} />
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={3}>
            <Grid item sx={{ height: '100%' }} xs={12}>
              <Editor enabledOptions={enabledConfigs} updateEnabledOptions={setEnabledConfigs} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default EditOptions;
