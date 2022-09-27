import { useState, ChangeEvent, Fragment } from 'react';
import { Grid, Checkbox, Typography, ToggleButton, FormGroup, FormControlLabel } from '@mui/material';
import { Option } from './Option';
import type { AddOrRemoveProp, HandleInput, Descriptor } from '../types';
import { marked } from 'marked';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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

  let optionsDisplay = null;

  const createMarkup = (description: any) => {
    console.log('createMarkup', description);

    return { __html: description };
  };

  if (isChecked) {
    if (descriptor.properties) {
      optionsDisplay = (
        <Fragment>
          <Grid container sx={{ borderLeft: '1px solid', borderColor: 'primary.gray' }} pl={2}>
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
        </Fragment>
      );
    } else if (descriptor.type === 'string') {
      optionsDisplay = <Option descriptor={descriptor} onChange={handleInput} value={value} isChecked={isChecked} />;
    }
  }

  return (
    <Grid direction="column" container key={indexKey}>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                icon={<KeyboardArrowDownIcon />}
                checkedIcon={<KeyboardArrowUpIcon />}
                name={descriptor.name}
                checked={isChecked}
                onChange={handleToggle}
                inputProps={{ 'aria-label': 'controlled' }}
                size="small"
              />
            }
            label={<Typography variant="subtitle1">{descriptor.name}</Typography>}
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">
          <div dangerouslySetInnerHTML={createMarkup(marked.parse(descriptor.description))} />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {optionsDisplay}
      </Grid>
    </Grid>
  );
};
