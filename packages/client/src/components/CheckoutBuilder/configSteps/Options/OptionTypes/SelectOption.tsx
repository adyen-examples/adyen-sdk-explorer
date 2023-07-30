import { FormControl, MenuItem, Select } from '@mui/material';
import { AdyenInputTheme } from './AdyenInputTheme';

export const SelectOption = ({ descriptor, value, onChange, values }: any) => {
  return (
    <FormControl sx={{ width: '50%' }}>
      <Select
        labelId="boolean-label"
        id="boolean-select"
        name={descriptor.name}
        value={value}
        onChange={(e: any) => onChange(e.target.name, e.target.value)}
        input={<AdyenInputTheme />}
      >
        {values.map((propValue: string) => {
          return <MenuItem value={propValue}>{propValue}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};
