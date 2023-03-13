import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { marked } from 'marked';
import { Box } from '@mui/system';
import { Checkbox, Grid, Typography } from '@mui/material';
import { useAppDispatch } from '../../../../hooks';
import { addOrRemoveProp, handleUpdateConfig } from '../../helpers';
import { ArrayOption, BooleanOption, ObjectOption, StringOption, TextInputField } from './OptionTypes';
import type { Descriptor } from '../../types';

export interface OptionWrapperPropTypes {
  descriptor: Descriptor;
  configuration: any;
  action: ActionCreatorWithPayload<any>;
}

export const OptionWrapper = ({ descriptor, configuration, action }: OptionWrapperPropTypes) => {
  const dispatch = useAppDispatch();

  const handleToggle = (e: any, checked: boolean) => {
    addOrRemoveProp(e, descriptor, configuration, action);
  };

  const handleInput = (item: string, value: any, current: any) => {
    const toUpdate = handleUpdateConfig(configuration, item, value, current);
    dispatch(action(toUpdate));
  };

  let optionsDisplay = null;

  const createMarkup = (description: any) => {
    return { __html: description };
  };

  const value = configuration[descriptor.name];

  if (value !== undefined) {
    if (descriptor.properties) {
      optionsDisplay = <StringOption descriptor={descriptor} onChange={handleInput} value={value} isChecked={value !== undefined} />;
    } else if (descriptor.type === 'string') {
      optionsDisplay = <TextInputField descriptor={descriptor} onChange={handleInput} value={value} isChecked={value !== undefined} />;
    } else if (descriptor.type === 'boolean' && descriptor.name) {
      optionsDisplay = <BooleanOption descriptor={descriptor} onChange={handleInput} value={value} />;
    } else if (descriptor.type === 'array' && descriptor.name) {
      optionsDisplay = <ArrayOption descriptor={descriptor} onChange={handleInput} value={value} isChecked={value !== undefined} />;
    } else if (descriptor.type === 'object' && !descriptor.properties) {
      optionsDisplay = <ObjectOption />;
    }
  }

  return (
    <Grid direction="column" container>
      <Grid item xs={12}>
        <Box>
          <Typography sx={{ display: 'inline-block' }} variant="subtitle2">
            {descriptor.name}
          </Typography>
          {descriptor.type && (
            <Typography ml={1} sx={{ display: 'inline-block', fontSize: '0.75rem' }} variant="caption">
              {descriptor.type}
            </Typography>
          )}
          {descriptor.required && (
            <Typography ml={1} sx={{ display: 'inline-block', fontSize: '0.75rem', color: '#ff9800' }} variant="caption">
              Required
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" dangerouslySetInnerHTML={createMarkup(marked.parse(descriptor.description))}></Typography>
      </Grid>
      {descriptor.configure !== false && (
        <Grid item xs={12}>
          <Checkbox
            icon={<Typography sx={{ fontSize: '0.75rem', p: 0, color: '#06f' }}>Add parameter</Typography>}
            checkedIcon={<Typography sx={{ fontSize: '0.75rem' }}>Remove</Typography>}
            name={descriptor.name}
            checked={value !== undefined}
            onChange={handleToggle}
            inputProps={{ 'aria-label': 'controlled' }}
            sx={{ p: 0 }}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        {optionsDisplay}
      </Grid>
    </Grid>
  );
};
