import { Grid, Box, Divider, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ListOptions, NavButtons } from './configSteps';
import { Editor } from './configSteps/Editor';
import type { ConfigPropTypes, UpdateConfig } from './types';

export const Config = ({ configuration, descriptors, step, setActiveStep, action, updateStore }: ConfigPropTypes) => {
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
        <Grid item xs={10}>
          <Typography pb={2} variant="body1" gutterBottom>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
            ullamcorper sit amet ligula. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in ipsum id orci porta
            dapibus.
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="overline" gutterBottom>
            <Box sx={{ fontSize: 16,fontWeight: 'medium' }}>Parameters</Box>
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={7}>
          <ListOptions descriptors={descriptors} configuration={configuration} handleUpdateConfig={handleUpdateConfig} />
        </Grid>
        <Grid item xs={2}>
          <Grid container spacing={3}>
            <Grid item sx={{ height: '100%' }} xs={12}>
              <Box sx={{ position: 'fixed', top: 0, right: 0, width: '450px', height: '100vh', bgcolor: 'secondary.main' }}>
                <Editor configuration={configuration} handleJsonEditorUpdate={handleJsonEditorUpdate} />
                <Divider light />
                <NavButtons step={step} setActiveStep={setActiveStep} configuration={configuration} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
