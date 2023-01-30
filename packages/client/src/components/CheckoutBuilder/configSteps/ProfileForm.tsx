import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { OnDeckPropType } from '../../../app/types';
import { Content } from './Content';

interface ProfileFormProps {
  configuration: OnDeckPropType;
  action: any;
  updateStore: (value: any, action: ActionCreatorWithPayload<any>) => void;
  content: any;
}

export const ProfileForm = ({ configuration, action, updateStore, content }: ProfileFormProps) => {
  const handleChange = (e: any) => {
    updateStore({ [e.target.name]: e.target.value }, action);
  };

  return (
    <Box>
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
    </Box>
  );
};
