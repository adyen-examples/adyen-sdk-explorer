import { useState, Fragment, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Editor } from './configSteps/Editor';
import { ListOptions, NavButtons } from './configSteps';
import type { ConfigPropTypes } from './types';

export const Config = ({ configuration, descriptors, step, setActiveStep }: ConfigPropTypes) => {
  const [currentConfig, setCurrentConfig] = useState(configuration);
  console.log('RERENDER FOR STEP', step, currentConfig);

  // useEffect(() => {
  //   setCurrentConfig(configuration);
  // }, [configuration]);

  const handleUpdateConfig = (key: string, value: string | null) => {
    console.log('HANDLE UPDATE CONFIG', key, value);
    if (value === null) {
      let newConfig = { ...currentConfig };
      delete newConfig[key];
      setCurrentConfig(newConfig);
    } else {
      setCurrentConfig(prevState => ({
        ...prevState,
        [key]: value
      }));
    }
  };

  const handleJsonEditorUpdate = (e: any) => {
    setCurrentConfig(e.jsObject);
  };

  return (
    <Fragment>
      <Grid mt={2} container>
        <Grid item xs={7}>
          <ListOptions descriptors={descriptors} configuration={currentConfig} handleUpdateConfig={handleUpdateConfig} />
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={3}>
            <Grid item sx={{ height: '100%' }} xs={12}>
              <Editor configuration={currentConfig} handleJsonEditorUpdate={handleJsonEditorUpdate} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <NavButtons step={step} setActiveStep={setActiveStep} configuration={currentConfig} />
    </Fragment>
  );
};
