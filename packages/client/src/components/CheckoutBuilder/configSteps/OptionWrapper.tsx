import { ChangeEvent, Fragment, useState } from 'react';
import { Grid, Checkbox, Typography, FormGroup, FormControlLabel, Select, MenuItem, FormControl, InputBase } from '@mui/material';
import { Option } from './Option';
import { ArrayOption } from './ArrayOption';
import type { AddOrRemoveProp, Descriptor } from '../types';
import { marked } from 'marked';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';

const AdyenInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 0,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #0066ff',
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    padding: '1px 1px 1px 1px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: theme.typography.subtitle2.fontFamily,
    color: theme.palette.primary.main,
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}));

export interface OptionWrapperPropTypes {
  value: any;
  indexKey: string;
  descriptor: Descriptor;
  addOrRemoveProp: AddOrRemoveProp;
  handleInput: any; // need to change this to HandleInput from types
}

export const OptionWrapper = ({ descriptor, indexKey, value, addOrRemoveProp, handleInput }: OptionWrapperPropTypes) => {
  const [boolValue, setBoolValue] = useState(true);

  const handleBool = (e: any) => {
    setBoolValue(e.target.value);
    handleInput(e.target.name, e.target.value);
  };

  const handleToggle = (e: any) => {
    addOrRemoveProp(e.target.name);
  };

  let optionsDisplay = null;

  const createMarkup = (description: any) => {
    return { __html: description };
  };

  if (value !== undefined) {
    if (descriptor.properties) {
      optionsDisplay = (
        <Fragment>
          <Grid container sx={{ borderLeft: '1px solid', borderColor: 'primary.gray' }} pl={2}>
            {descriptor.properties.map((prop: Descriptor) => {
              return (
                <Grid item xs={7} key={prop.name}>
                  <Option
                    current={descriptor.name}
                    descriptor={prop}
                    onChange={handleInput}
                    value={value[prop.name]}
                    isChecked={value !== undefined}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Fragment>
      );
    } else if (descriptor.type === 'string') {
      optionsDisplay = <Option descriptor={descriptor} onChange={handleInput} value={value} isChecked={value !== undefined} />;
    } else if (descriptor.type === 'boolean' && descriptor.name) {
      optionsDisplay = (
        <FormControl sx={{ width: '25%' }} size="small">
          <Select labelId="boolean-label" id="boolean-select" name={descriptor.name} value={boolValue} onChange={handleBool} input={<AdyenInput />}>
            <MenuItem sx={{ fontSize: 'subtitle2.fontSize' }} value={true as any}>
              true
            </MenuItem>
            <MenuItem value={false as any}>false</MenuItem>
          </Select>
        </FormControl>
      );
    } else if (descriptor.type === 'array' && descriptor.name) {
      optionsDisplay = <ArrayOption descriptor={descriptor} onChange={handleInput} value={value} isChecked={value !== undefined} />;
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
                checked={value !== undefined}
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
