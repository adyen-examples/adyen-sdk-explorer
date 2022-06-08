import { Fragment } from 'react';
import { Grid } from '@mui/material';
import { Editor } from './configSteps/Editor';
import { ListOptions, NavButtons } from './configSteps';
import type { ConfigPropTypes, UpdateConfig } from './types';

export const Config = ({ configuration, descriptors, step, setActiveStep, action, updateStore }: ConfigPropTypes) => {
  const handleUpdateConfig: UpdateConfig = (item, value, current): void => {
    let newConfig = { ...configuration };

    console.log('UPDATE CONFIG PARAMS', item, value, current, newConfig);
    if (value === null) {
      delete newConfig[item];
    } else if (current) {
      let newCurrent = { ...newConfig[current], [item]: value };
      newConfig = { ...newConfig, [current]: newCurrent };
    } else {
      console.log('ADDING FRESH', current);
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
        <Grid item xs={7}>
          <ListOptions descriptors={descriptors} configuration={configuration} handleUpdateConfig={handleUpdateConfig} />
        </Grid>
        <Grid item xs={5}>
          <div style={{ position: 'sticky', top: 0 }}>
            <Grid container spacing={3}>
              <Grid item sx={{ height: '100%' }} xs={12}>
                <Editor configuration={configuration} handleJsonEditorUpdate={handleJsonEditorUpdate} />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <NavButtons step={step} setActiveStep={setActiveStep} configuration={configuration} />
    </Fragment>
  );
};
