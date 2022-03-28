import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Editor from './Editor';
import ListOptions from './ListOptions';

const EditOptions = (props: any) => {
  const { configDictionary, configuration, setConfiguration } = props;
  
  return (
    <React.Fragment>
      <Typography variant="h6">Global Parameters</Typography>
      <Divider />
      <Grid mt={2} container>
        <Grid item xs={7}>
          <ListOptions configDictionary={configDictionary} configuration={configuration} setConfiguration={setConfiguration} />
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={3}>
            <Grid item sx={{ height: '100%' }} xs={12}>
              <Editor configDictionary={configDictionary} configuration={configuration} setConfiguration={setConfiguration} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default EditOptions;
