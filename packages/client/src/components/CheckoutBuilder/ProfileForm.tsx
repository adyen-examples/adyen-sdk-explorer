import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const ProfileForm = (props: any) => {
  const { baseConfiguration, setBaseConfiguration } = props;
  const {configuration} = baseConfiguration;

  const handleChange = (name: string) => (e: SelectChangeEvent) => {
    configuration.state = { [name]: e.target.value };
    setBaseConfiguration({configuration});
  };

  const handleTextChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    configuration.state = { [name]: e.target.value };
    setBaseConfiguration({configuration});
  };
  
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Create Profile
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: -3 }}>
          <TextField
            id="profileName"
            name="profileName"
            label="Profile name"
            variant="standard"
            value={configuration.state.name ? configuration.state.name : ''}
            onChange={handleTextChange('name')}
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
              value={configuration.state.product ? configuration.state.product : ''}
              onChange={handleChange('product')}
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
              value={configuration.state.dropin_version ? configuration.state.dropin_version : ''}
              onChange={handleChange('dropin_version')}
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
              value={configuration.state.checkout_version ? configuration.state.checkout_version : ''}
              label="Checkout Version *"
              onChange={handleChange('checkout_version')}
            >
              <MenuItem value={'v68'}>v68</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProfileForm;
