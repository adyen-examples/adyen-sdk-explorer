import { FormControl, MenuItem, Select } from '@mui/material';
import { AdyenInput } from './AdyenInput';
import { handleUpdateConfig } from '../../../helpers';
import type { OptionPropTypes } from './types';

export const BooleanOption = ({ descriptor, onChange, value }: OptionPropTypes) => {
  <FormControl sx={{ width: '25%' }} size="small">
    <Select
      labelId="boolean-label"
      id="boolean-select"
      name={descriptor.name}
      value={value}
      onChange={(e: any) => handleUpdateConfig(e.target.name, e.target.value, descriptor.name)}
      input={<AdyenInput />}
    >
      <MenuItem sx={{ fontSize: 'subtitle2.fontSize' }} value={true as any}>
        true
      </MenuItem>
      <MenuItem value={false as any}>false</MenuItem>
    </Select>
  </FormControl>;
};
