import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ListOptions, NavButtons } from './configSteps';
import { Editor } from './configSteps/Editor';
import type { ConfigPropTypes, UpdateConfig } from './types';
import { Content } from './configSteps/Content';

export const Config = ({ configuration, descriptors, step, setActiveStep, action, updateStore, content }: ConfigPropTypes) => {
  const { profilePageContent } = content;
  const handleUpdateConfig: UpdateConfig = (item, value, current): void => {
    console.log('handleupdateconfig',item,value,current);
    
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
      <Grid mt={2} ml={0} spacing={1} container>
        <Grid item xs={11}>
          <Content title={content.title} version={content.version} description={content.description} />
          <ListOptions descriptors={descriptors} configuration={configuration} handleUpdateConfig={handleUpdateConfig} />
        </Grid>
        <Grid item xs={1}>
          <Grid
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            container
            sx={{ position: 'fixed', top: 0, right: 0, height: '100vh', bgcolor: 'secondary.main', width: '28%', pt:'64px' }}
          >
            <Grid item xs={10} sx={{ height: '90%' }}>
              <Editor configuration={configuration} handleJsonEditorUpdate={handleJsonEditorUpdate} />
            </Grid>
            <Grid item xs={1}>
              <Grid p={1} sx={{ height: '100%' }} direction="row" container justifyContent="space-between" alignItems="flex-end">
                <Grid item>
                  <Button sx={{ bgcolor: '#0abf53' }} variant="contained">
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <NavButtons step={step} setActiveStep={setActiveStep} configuration={configuration} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
