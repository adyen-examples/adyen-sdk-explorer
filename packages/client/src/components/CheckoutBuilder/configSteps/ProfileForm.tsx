import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Content } from './Content';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import type { OnDeckPropType } from '../../../app/types';
import type { PageContentType } from '../helpers/content';

interface ProfileFormProps {
  configuration: OnDeckPropType;
  content: PageContentType;
}

export const ProfileForm = ({ configuration, content }: ProfileFormProps) => {
  const dispatch = useAppDispatch();

  const handleChange = (e: SelectChangeEvent<any>) => dispatch(onDeckActions.updateTxVariant(e.target.value));

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
          onChange={e => handleChange(e)}
          label="Product"
        >
          <MenuItem value={'dropin'}>dropin</MenuItem>
        </Select>
      </FormControl>
      <FormHelperText>Required</FormHelperText>
    </Box>
  );
};
