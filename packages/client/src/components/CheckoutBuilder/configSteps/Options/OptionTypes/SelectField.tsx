import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import type { TextInputFieldProps } from './TextInputField';

export const SelectField = ({ descriptor, onChange, value, current }: TextInputFieldProps) => {
  const options = descriptor.enum?.filter(item => item !== 'ALL');

  let textInputFieldValue = value !== undefined ? value : options && options[0];

  return (
    <div>
      <Select
        labelId={`${descriptor.name}-select-label-id`}
        id={`${descriptor.name}-select`}
        value={textInputFieldValue}
        onChange={(e: SelectChangeEvent) => onChange(descriptor.name, e.target.value, current)}
        size="small"
        type="text"
      >
        {options?.map((option: string) => {
          return (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};
