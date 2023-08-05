import { FormControl, MenuItem, Select } from '@mui/material';
import { AdyenInputTheme } from './AdyenInputTheme';
import type { OptionPropTypes } from './types';

export const BooleanOption = ({ descriptor, value, onChange }: OptionPropTypes) => {
  return (
    <FormControl sx={{ width: '50%' }}>
      <Select
        labelId="boolean-label"
        id="boolean-select"
        name={descriptor.name}
        value={value}
        onChange={(e: any) => onChange(e.target.name, e.target.value)}
        input={<AdyenInputTheme />}
        sx={{ svg: { color: 'primary.dark' } }}
      >
        <MenuItem sx={{ fontSize: 'subtitle2.fontSize' }} value={true as any}>
          true
        </MenuItem>
        <MenuItem value={false as any}>false</MenuItem>
      </Select>
    </FormControl>
  );
};
