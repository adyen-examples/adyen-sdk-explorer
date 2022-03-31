import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import Editor from './Editor';
import ListOptions from './ListOptions';

const EditOptions = (props: any) => {
  const { configDictionary } = props;
  const optionsType = Object.keys(configDictionary)[0];
  return (
    <Fragment>
      <Typography variant="h6">{optionsType}</Typography>
      <Divider />
      <Grid mt={2} container>
        <Grid item xs={7}>
          <ListOptions configDictionary={configDictionary} />
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={3}>
            <Grid item sx={{ height: '100%' }} xs={12}>
              <Editor configDictionary={configDictionary} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EditOptions;
