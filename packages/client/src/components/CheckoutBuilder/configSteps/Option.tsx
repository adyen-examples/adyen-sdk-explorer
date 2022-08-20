import { ChangeEvent } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import { Descriptor, HandleInput } from '../types';

export interface OptionPropTypes {
  descriptor: Descriptor;
  onChange: HandleInput;
  value: string;
  isChecked: boolean;
  current?: string;
}

export const Option = ({ descriptor, onChange, value, isChecked, current }: OptionPropTypes) => {
  return (
    <Grid item xs={11}>
      <Typography variant="body2">{descriptor.name}</Typography>
      {isChecked && (
        <TextField
          name={descriptor.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e, current)}
          id={descriptor.name}
          value={value}
          fullWidth
          variant="standard"
        />
      )}
    </Grid>
  );
};
