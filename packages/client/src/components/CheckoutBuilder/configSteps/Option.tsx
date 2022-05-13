import { Grid, Typography, TextField } from '@mui/material';
import { Descriptor, HandleInput } from '../types';

export interface OptionPropTypes {
  descriptor: Descriptor;
  onChange: HandleInput;
  value: string;
  isChecked: boolean;
}

export const Option = ({ descriptor, onChange, value, isChecked }: OptionPropTypes) => {
  return (
    <Grid item xs={11}>
      <Typography variant="overline">{descriptor.name}</Typography>
      {/* <Typography variant="subtitle2">{descriptor.description}</Typography> */}
      {isChecked && <TextField name={descriptor.name} onChange={onChange} id={descriptor.name} label={descriptor.name} value={value} fullWidth />}
    </Grid>
  );
};
