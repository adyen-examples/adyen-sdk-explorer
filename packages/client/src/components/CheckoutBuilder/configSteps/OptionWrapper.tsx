import { useState, ChangeEvent, Fragment } from 'react';
import { Grid, Checkbox, Typography } from '@mui/material';
import { Option } from './Option';
import type { AddOrRemoveProp, HandleInput, Descriptor } from '../types';

export interface OptionWrapperPropTypes {
  value: any;
  indexKey: string;
  descriptor: Descriptor;
  addOrRemoveProp: AddOrRemoveProp;
  handleInput: HandleInput;
}

export const OptionWrapper = ({ descriptor, indexKey, value, addOrRemoveProp, handleInput }: OptionWrapperPropTypes) => {
  const [isChecked, setIsChecked] = useState(!!value);

  const handleToggle = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    addOrRemoveProp(e);
    setIsChecked(checked);
  };

  let optionsDisplay;

  if (descriptor.properties) {
    optionsDisplay = (
      <Fragment>
        <Typography variant="overline">{descriptor.name}</Typography>
        {/* <Typography variant="subtitle2">{descriptor.description}</Typography> */}
        {descriptor.properties.map((prop: Descriptor) => {
          return (
            isChecked && (
              <Grid item xs={11} key={prop.name}>
                <Option current={descriptor.name} descriptor={prop} onChange={handleInput} value={value[prop.name]} isChecked={isChecked} />
              </Grid>
            )
          );
        })}
      </Fragment>
    );
  } else {
    optionsDisplay = <Option descriptor={descriptor} onChange={handleInput} value={value} isChecked={isChecked} />;
  }

  // return <Option descriptor={descriptor} indexKey={indexKey} value={value} addOrRemoveProp={addOrRemoveProp} handleInput={handleInput} />;
  return (
    <Grid item xs={11} key={indexKey}>
      <Checkbox name={descriptor.name} checked={isChecked} onChange={handleToggle} inputProps={{ 'aria-label': 'controlled' }} size="small" />
      {optionsDisplay}
    </Grid>
  );
};
