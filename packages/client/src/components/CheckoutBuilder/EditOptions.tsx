import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Editor from './Editor';
import ListOptions from './ListOptions';

const EditOptions = (props: any) => {
  const { configDictionary, baseConfiguration, setBaseConfiguration } = props;
  const { configuration } = baseConfiguration;
  const optionsType = Object.keys(configDictionary)[0];
  return (
    <React.Fragment>
      <Typography variant="h6">{optionsType}</Typography>
      <Divider />
      <Grid mt={2} container>
        <Grid item xs={7}>
          <ListOptions
            configDictionary={configDictionary}
            baseConfiguration={baseConfiguration}
            setBaseConfiguration={setBaseConfiguration}
          />
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={3}>
            <Grid item sx={{ height: '100%' }} xs={12}>
              <Editor
                configDictionary={configDictionary}
                baseConfiguration={baseConfiguration}
                setBaseConfiguration={setBaseConfiguration}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default EditOptions;
