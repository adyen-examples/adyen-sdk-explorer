import { Box, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { Fragment } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import type { OnDeckPropType } from '../../../app/types';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import { NavButtons } from './NavButtons';

interface ProfileFormProps {
  configuration: OnDeckPropType;
  step: number;
  action: any;
  updateStore: (value: any, action: ActionCreatorWithPayload<any>) => void;
  setActiveStep: (step: number) => void;
}

export const ProfileForm = ({ configuration, step, setActiveStep, action, updateStore }: ProfileFormProps) => {
  const handleChange = (e: any) => {
    updateStore({ [e.target.name]: e.target.value }, action);
  };

  return (
    <Fragment>
      <Grid mt={2} container >
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
        <Grid item xs={8} sx={{ mt: 1 }}>
          <TextField id="profileName" name="name" label="Profile name" fullWidth value={configuration.name} onChange={handleChange} />
          <FormHelperText>Required</FormHelperText>
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel>Product</InputLabel>
            <Select
              sx={{ width: '100%' }}
              labelId="product-select-label"
              id="product-select"
              name="product"
              value={configuration.product}
              onChange={handleChange}
              label="Product"
              defaultValue="dropin"
            >
              <MenuItem value={'dropin'}>dropin</MenuItem>
            </Select>
          </FormControl>
          <FormHelperText>Required</FormHelperText>
        </Grid>
      </Grid>
      <Grid
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        container
        sx={{ position: 'fixed', top: 0, right: 0, height: '100vh', bgcolor: 'secondary.main', width: '25%' }}
      >
        <Grid item xs={10} sx={{ height: '90%' }}>
          <JSONInput viewOnly={true} placeholder={configuration} colors={dark_vscode_tribute} locale={localeEn} height="100%" width="100%" />
        </Grid>
        <Grid item xs={1}>
          <Grid p={1} sx={{ height: '100%' }} direction="row" container justifyContent="flex-end" alignItems="flex-end">
            <Grid item>
              <NavButtons step={step} setActiveStep={setActiveStep} configuration={configuration} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
