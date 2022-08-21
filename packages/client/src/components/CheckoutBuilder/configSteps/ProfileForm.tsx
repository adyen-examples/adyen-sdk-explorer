import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { Fragment } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import type { OnDeckPropType } from '../../../app/types';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import { Content } from './Content';
import { NavButtons } from './NavButtons';

interface ProfileFormProps {
  configuration: OnDeckPropType;
  step: number;
  action: any;
  updateStore: (value: any, action: ActionCreatorWithPayload<any>) => void;
  setActiveStep: (step: number) => void;
  content: any;
}

export const ProfileForm = ({ configuration, step, setActiveStep, action, updateStore, content }: ProfileFormProps) => {
  const { profilePageContent } = content;
  const handleChange = (e: any) => {
    updateStore({ [e.target.name]: e.target.value }, action);
  };

  return (
    <Fragment>
      <Grid spacing={1} mt={2} ml={0} container>
        <Grid item xs={11}>
          <Content title={content.title} version={content.version} description={content.description} />
          <FormControl fullWidth>
            <InputLabel>Product</InputLabel>
            <Select
              sx={{ width: '100%', borderRadius: '0', borderColor: '#0066ff', color: '#0066ff' }}
              labelId="product-select-label"
              id="product-select"
              name="product"
              value={configuration.product}
              onChange={handleChange}
              label="Product"
            >
              <MenuItem value={'dropin'}>dropin</MenuItem>
            </Select>
          </FormControl>
          <FormHelperText>Required</FormHelperText>
        </Grid>
        <Grid item xs={1}>
          <Grid
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            container
            sx={{ position: 'fixed', bottom: 0, right: 0, height: '100%', bgcolor: 'secondary.main', width: '28%', pt:'64px' }}
          >
            <Grid item xs={10}>
              <JSONInput viewOnly={true} placeholder={configuration} colors={dark_vscode_tribute} locale={localeEn} height="100%" width="100%" />
            </Grid>
            <Grid item xs={2}>
              <Grid p={1} sx={{ height: '100%' }} direction="row" container justifyContent="flex-end" alignItems="flex-end">
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
