import { useState, ChangeEvent } from 'react';
import { Grid, Checkbox, Typography, TextField } from '@mui/material';
import type { Descriptor } from '../../../app/types';

type OptionPropTypes = {
  value: string;
  indexKey: number;
  descriptor: Descriptor;
  addOrRemoveProp: (e: ChangeEvent<HTMLInputElement>) => void | undefined;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Option = ({ descriptor, indexKey, value, addOrRemoveProp, handleInput }: OptionPropTypes) => {
  const [isChecked, setIsChecked] = useState(!!value);

  const handleToggle = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    addOrRemoveProp(e);
    setIsChecked(checked);
  };

  return (
    <Grid item xs={11} key={indexKey}>
      <Checkbox name={descriptor.name} checked={isChecked} onChange={handleToggle} inputProps={{ 'aria-label': 'controlled' }} size="small" />
      <Typography variant="overline">{descriptor.name}</Typography>
      <Typography variant="subtitle2">{descriptor.description}</Typography>
      {isChecked && <TextField name={descriptor.name} onChange={handleInput} id={descriptor.name} label={descriptor.name} value={value} fullWidth />}
    </Grid>
  );
};
