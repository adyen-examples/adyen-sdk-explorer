import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { useState, useEffect } from 'react';
import { CheckoutBuilderProps } from '../../../types';

const myState = {
  profile: {
    name: '',
    product: '',
    checkout_version: '',
    dropin_version: '',
    optionalConfiguration: [
      {
        layer: '',
        enabledConfig: {}
      }
    ],
    apiConfiguration: [
      {
        api: '',
        enabledConfig: {}
      },
      {
        api: '',
        enabledConfig: {}
      }
    ]
  }
}


const ProfileForm = (props: CheckoutBuilderProps) => {
  const {configuration, setConfiguration} = props;
  const {name, product, checkout_version, dropin_version} = configuration;

  const handleChange = (name: string) => (e: SelectChangeEvent) => {
    setConfiguration({ ...configuration, [name]: e.target.value });
  };

  const handleTextChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('logging object before setting state',{ ...configuration, [name]: e.target.value });
    setConfiguration({ ...configuration, [name]: e.target.value });
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Create Configuration Profile
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: -3 }}>
          <TextField
            id="profileName"
            name="profileName"
            label="Profile name"
            variant="standard"
            onChange={handleTextChange('name')}
            sx={{ width: '50%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Choose Product
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ width: 1 }}>
            <InputLabel id="dropin-select-required-label">Product</InputLabel>
            <Select labelId="product-select-label" id="product-select" value={product} onChange={handleChange('product')} label="Product *">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Choose Library
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ width: 1 }}>
            <InputLabel id="dropin-select-required-label">Dropin</InputLabel>
            <Select
              labelId="dropin-version-select-label"
              id="dropin-version-select"
              value={dropin_version}
              onChange={handleChange('dropin_version')}
              label="Dropin Version *"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ width: 1 }}>
            <InputLabel id="checkout-select-required-label">Checkout</InputLabel>
            <Select
              labelId="checkout-version-select-label"
              id="checkout-version-select"
              value={checkout_version}
              label="Checkout Version *"
              onChange={handleChange('checkout_version')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProfileForm;
