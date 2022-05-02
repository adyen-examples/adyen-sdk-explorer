import { Fragment, useState, ChangeEvent } from 'react';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { NavButtons } from './NavButtons';

export const ProfileForm = ({ step, setActiveStep }: { step: number; setActiveStep: (step: number) => void }) => {
  const [config, setConfig] = useState({
    name: '',
    product: '',
    checkoutVersion: '',
    dropinVersion: ''
  });

  const handleChange = (e: any) => {
    setConfig(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Create Profile
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: -3 }}>
          <TextField
            id="profileName"
            name="name"
            label="Profile name"
            variant="standard"
            value={config.name}
            onChange={handleChange}
            sx={{ width: '50%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Choose Product
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline" gutterBottom>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
            ullamcorper sit amet ligula. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in ipsum id orci porta
            dapibus.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ width: 1 }}>
            <InputLabel id="dropin-select-required-label">Product</InputLabel>
            <Select
              labelId="product-select-label"
              id="product-select"
              name="product"
              value={config.product}
              onChange={handleChange}
              label="Product *"
            >
              <MenuItem value={'dropin'}>dropin</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Choose Web Components LIbrary
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline" gutterBottom>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
            ullamcorper sit amet ligula. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in ipsum id orci porta
            dapibus.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ width: 1 }}>
            <InputLabel id="dropin-select-required-label">Dropin</InputLabel>
            <Select
              labelId="dropin-version-select-label"
              id="dropin-version-select"
              name="dropinVersion"
              value={config.dropinVersion}
              onChange={handleChange}
              label="Dropin Version *"
            >
              <MenuItem value={'v5.11.0'}>v5.11.0</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Choose Checkout LIbrary
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline" gutterBottom>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
            ullamcorper sit amet ligula. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in ipsum id orci porta
            dapibus.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ width: 1 }}>
            <InputLabel id="checkout-select-required-label">Checkout</InputLabel>
            <Select
              labelId="checkout-version-select-label"
              id="checkout-version-select"
              name="checkoutVersion"
              value={config.checkoutVersion}
              label="Checkout Version *"
              onChange={handleChange}
            >
              <MenuItem value={'v68'}>v68</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <NavButtons step={step} setActiveStep={setActiveStep} configuration={config} />
    </Fragment>
  );
};
