import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ListOptions, NavButtons } from './configSteps';
import { Editor } from './configSteps/Editor';
import type { ConfigPropTypes, UpdateConfig } from './types';

export const Config = ({ configurpation, descriptors, step, setActiveStep, action, updateStore }: ConfigPropTypes) => {
  const handleUpdateConfig: UpdateConfig = (item, value, current): void => {
    let newConfig = { ...configuration };

    if (value === null) {
      delete newConfig[item];
    } else if (current) {
      let newCurrent = { ...newConfig[current], [item]: value };
      newConfig = { ...newConfig, [current]: newCurrent };
    } else {
      newConfig = { ...newConfig, [item]: value };
    }
    updateStore(newConfig, action);
  };

  const handleJsonEditorUpdate = (e: any) => {
    updateStore(e.jsObject, action);
  };

  return (
    <Fragment>
      <Grid mt={2} container>
        <Grid item xs={8}>
          <Typography pb={2} variant="body1" gutterBottom>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
            ullamcorper sit amet ligula. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in ipsum id orci porta
            dapibus.
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="overline" gutterBottom>
            <Box sx={{ fontSize: 16, fontWeight: 'medium' }}>Parameters</Box>
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={8}>
          <ListOptions descriptors={descriptors} configuration={configuration} handleUpdateConfig={handleUpdateConfig} />
        </Grid>
        <Grid
          direction="column"
          justifyContent="space-between"
          alignItems="stretch"
          container
          sx={{ position: 'fixed', top: 0, right: 0, height: '100vh', bgcolor: 'secondary.main', width: '25%' }}
        >
          <Grid item xs={8} sx={{ height: '90%' }}>
            <Editor configuration={configuration} handleJsonEditorUpdate={handleJsonEditorUpdate} />
          </Grid>
          <Grid item xs={1}>
            <Grid p={1} sx={{ height: '100%' }} direction="row" container justifyContent="space-between" alignItems="flex-end">
              <Grid item>
                <Button variant="contained">Edit</Button>
              </Grid>
              <Grid item>
                <NavButtons step={step} setActiveStep={setActiveStep} configuration={configuration} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
