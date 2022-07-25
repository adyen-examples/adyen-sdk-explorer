import { useState, ChangeEvent, Fragment } from 'react';
import { Grid, Checkbox, Typography, ToggleButton } from '@mui/material';
import { Option } from './Option';
import type { AddOrRemoveProp, HandleInput, Descriptor } from '../types';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface OptionWrapperPropTypes {
  value: any;
  indexKey: string;
  descriptor: Descriptor;
  addOrRemoveProp: AddOrRemoveProp;
  handleInput: HandleInput;
}

export const OptionWrapper = ({ descriptor, indexKey, value, addOrRemoveProp, handleInput }: OptionWrapperPropTypes) => {
  const [isChecked, setIsChecked] = useState(!!value);

  const handleToggle = (e: any, checked: boolean) => {
    addOrRemoveProp(e);
    setIsChecked(checked);
  };

  let optionsDisplay;

  if (descriptor.properties) {
    optionsDisplay = (
      <Fragment>
        <Typography variant="body2">{descriptor.name}</Typography>
        <Grid container pl={2}>
          {descriptor.properties.map((prop: Descriptor) => {
            return (
              isChecked && (
                <Grid item xs={7} key={prop.name}>
                  <Option current={descriptor.name} descriptor={prop} onChange={handleInput} value={value[prop.name]} isChecked={isChecked} />
                </Grid>
              )
            );
          })}
        </Grid>
        {/* <Typography variant="subtitle2">{descriptor.description}</Typography> */}
      </Fragment>
    );
  } else {
    optionsDisplay = <Option descriptor={descriptor} onChange={handleInput} value={value} isChecked={isChecked} />;
  }

  return (
    <Grid container key={indexKey}>
      <Grid item xs={7}>
        <Checkbox name={descriptor.name} checked={isChecked} onChange={handleToggle} inputProps={{ 'aria-label': 'controlled' }} size="small" />
      </Grid>
      <Grid item xs={7}>
        {optionsDisplay}
      </Grid>
    </Grid>
  );
};
