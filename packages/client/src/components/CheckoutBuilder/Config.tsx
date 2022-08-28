import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ListOptions, NavButtons } from './configSteps';
import { Editor } from './configSteps/Editor';
import type { ConfigPropTypes, UpdateConfig } from './types';
import { Content } from './configSteps/Content';

export const Config = ({ configuration, descriptors, step, setActiveStep, action, updateStore, content }: ConfigPropTypes) => {
  const { profilePageContent } = content;
  const handleUpdateConfig: UpdateConfig = (item, value, current): void => {
    console.log('handleupdateconfig', item, value, current);

    let newConfig = { ...configuration };

    if (value === null) {
      delete newConfig[item];
    } else if (current && 'boolean' == typeof value) {
      newConfig = { ...newConfig, [current]: value };
    } else if (current && 'string' == typeof value) {
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
        <Grid item xs={12}>
          <Content title={content.title} version={content.version} description={content.description} />
          <ListOptions descriptors={descriptors} configuration={configuration} handleUpdateConfig={handleUpdateConfig} />
        </Grid>
      </Grid>
    </Fragment>
  );
};
