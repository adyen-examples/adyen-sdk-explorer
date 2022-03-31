import { Fragment } from 'react';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';

const ProfileForm = (props: any) => {
  const { configuration, setConfiguration } = props;
  const { product, checkout_version, dropin_version } = configuration;

  const handleChange = (name: string) => (e: SelectChangeEvent) => {
    setConfiguration({ ...configuration, [name]: e.target.value });
  };

  const handleTextChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('logging object before setting state', { ...configuration, [name]: e.target.value });
    setConfiguration({ ...configuration, [name]: e.target.value });
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
            name="profileName"
            label="Profile name"
            variant="standard"
            value={configuration.name}
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
            <Select labelId="product-select-label" id="product-select" value={product} onChange={handleChange('product')} label="Product *">
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
              value={dropin_version}
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
              value={checkout_version}
              label="Checkout Version *"
              onChange={handleChange('checkout_version')}
            >
              <MenuItem value={'v68'}>v68</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ProfileForm;
