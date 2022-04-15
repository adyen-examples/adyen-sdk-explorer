import { useState } from 'react';
import { Grid } from '@mui/material';
import { Editor } from './Editor';
import { ListOptions } from './ListOptions';
import type { ConfigPropTypes } from '../types';

export const EditOptions = ({ name, section, descriptors, updateConfig }: ConfigPropTypes) => {
  const setConfiguration = (optConfig: {}) => {
    const newConfig = { ...section, ...optConfig };
    updateConfig(name, newConfig);
  };

  return (
    <Grid mt={2} container>
      <Grid item xs={7}>
        <ListOptions configDictionary={descriptors} configuration={section} setConfiguration={setConfiguration} />
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={3}>
          <Grid item sx={{ height: '100%' }} xs={12}>
            <Editor configDictionary={descriptors} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
