import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputBase, MenuItem, Select, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { marked } from 'marked';
import { Fragment } from 'react';
import type { AddOrRemoveProp, Descriptor } from '../types';
import { ArrayOption } from './ArrayOption';
import { Option } from './Option';
import InfoIcon from '@mui/icons-material/Info';

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
  const handleToggle = (e: any, checked: boolean) => {
    addOrRemoveProp(e);
  };

  let optionsDisplay = null;

  const createMarkup = (description: any) => {
    return { __html: description };
  };

  if (value !== undefined) {
    if (descriptor.properties) {
      optionsDisplay = (
        <Fragment>
          <Grid container sx={{ border: '1px solid', borderColor: 'primary.border', borderRadius: 1, bgcolor: 'secondary.light' }} p={4}>
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
          <Select
            labelId="boolean-label"
            id="boolean-select"
            name={descriptor.name}
            value={value}
            onChange={(e: any) => handleInput(e.target.name, e.target.value, descriptor.name)}
            input={<AdyenInput />}
          >
            <MenuItem sx={{ fontSize: 'subtitle2.fontSize' }} value={true as any}>
              true
            </MenuItem>
            <MenuItem value={false as any}>false</MenuItem>
          </Select>
        </FormControl>
      );
    } else if (descriptor.type === 'array' && descriptor.name) {
      optionsDisplay = <ArrayOption descriptor={descriptor} onChange={handleInput} value={value} isChecked={value !== undefined} />;
    } else if (descriptor.type === 'object' && !descriptor.properties) {
      optionsDisplay = (
        <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" sx={{ border: '3px solid', borderColor: '#cce0ff' }}>
          <Grid item sx={{ bgcolor: '#cce0ff', color: 'primary.main', position: 'relative' }}>
            <InfoIcon sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} />
            <Box component="span" sx={{ bgcolor: '#cce0ff' }}>
              <InfoIcon sx={{ display: 'inline-block', visibility: 'hidden' }} />
            </Box>
          </Grid>
          <Grid item p={2}>
            <Typography variant="h6">Custom configuration use case. Use the JSON Editor pane.</Typography>
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <Grid direction="column" container key={indexKey}>
      <Grid item xs={12}>
        <Box>
          <Typography sx={{ display: 'inline-block' }} variant="subtitle2">
            {descriptor.name}
          </Typography>
          <Typography mx={1} sx={{ display: 'inline-block', fontSize: '0.75rem' }} variant="caption">
            {descriptor.type}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" dangerouslySetInnerHTML={createMarkup(marked.parse(descriptor.description))}></Typography>
      </Grid>
      <Grid item xs={12}>
        <Checkbox
          icon={<Typography sx={{ fontSize: '0.75rem', p: 0, color: 'rgb(255, 87, 34)' }}>Add parameter</Typography>}
          checkedIcon={<Typography sx={{ fontSize: '0.75rem' }}>Remove</Typography>}
          name={descriptor.name}
          checked={value !== undefined}
          onChange={handleToggle}
          inputProps={{ 'aria-label': 'controlled' }}
          sx={{ p: 0 }}
        />
      </Grid>
      <Grid item xs={12}>
        {optionsDisplay}
      </Grid>
    </Grid>
  );
};
