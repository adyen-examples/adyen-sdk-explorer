import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
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
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h6" gutterBottom>
            Create Profile
          </Typography>
        </Grid>
        <Grid item xs={10} sx={{ mt: -3 }}>
          <TextField
            id="profileName"
            name="name"
            label="Profile name"
            variant="standard"
            value={configuration.name}
            onChange={handleChange}
            sx={{ width: '50%' }}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h6" gutterBottom>
            Choose Product
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body2" gutterBottom>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
            ullamcorper sit amet ligula. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in ipsum id orci porta
            dapibus.
          </Typography>
        </Grid>
        <Grid item xs={10} sm={6}>
          <FormControl required sx={{ width: 1 }}>
            <InputLabel id="dropin-select-required-label">Product</InputLabel>
            <Select
              labelId="product-select-label"
              id="product-select"
              name="product"
              value={configuration.product}
              onChange={handleChange}
              label="Product *"
              defaultValue="dropin"
            >
              <MenuItem value={'dropin'}>dropin</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
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
          <JSONInput viewOnly={true} placeholder={{sample: true}} colors={dark_vscode_tribute} locale={localeEn} height="100%" width="100%" />
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
