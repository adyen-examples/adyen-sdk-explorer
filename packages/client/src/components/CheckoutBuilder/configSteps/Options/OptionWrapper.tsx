import { Checkbox, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { marked } from 'marked';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../../hooks';
import { addOrRemoveProp, handleUpdateConfig } from '../../helpers';
import type { Descriptor } from '../../types';
import { InitializeOption } from './InitializeOption';
import { ObjectOption } from './OptionTypes';

export interface OptionWrapperPropTypes {
  descriptor: Descriptor;
  configuration: any;
  action: ActionCreatorWithPayload<any>;
}

export const OptionWrapper = ({ descriptor, configuration, action }: OptionWrapperPropTypes) => {
  const dispatch = useAppDispatch();

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const toUpdate = addOrRemoveProp(configuration, e.target.name, descriptor);
    dispatch(action(toUpdate));
  };

  const handleInput = (item: string, value: any, current: any) => {
    let toUpdate;
    if (current) {
      toUpdate = handleUpdateConfig(configuration, item, value, current);
    } else {
      toUpdate = { ...configuration, [item]: value };
    }
    dispatch(action(toUpdate));
  };

  const createHtmlFromMarkup = (description: string) => {
    const tokens = marked.lexer(description);
    let blockQuote: any = tokens?.length > 0 && tokens[tokens.length - 1].type === 'blockquote' ? tokens.pop() : null;
    let blockQuoteText: any = blockQuote ? blockQuote.text : null;
    let html = marked.parser(tokens);

    return (
      <Box>
        <Typography variant="h6" className="markup" dangerouslySetInnerHTML={{ __html: html }}></Typography>
        {blockQuoteText && <ObjectOption styleType="info" content={blockQuoteText} mb={2} />}
      </Box>
    );
  };

  const value = configuration[descriptor.name];
  const isChecked = value !== undefined;

  return (
    <Grid direction="column" container sx={{ a: { color: 'primary.main', textDecoration: 'none' } }}>
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
            <Typography ml={1} sx={{ display: 'inline-block', fontSize: '0.75rem', color: 'info.required' }} variant="caption">
              Required
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        {descriptor?.description && createHtmlFromMarkup(descriptor.description)}
      </Grid>
      {descriptor.configure !== false && (
        <Grid item xs={12}>
          <Checkbox
            icon={<Typography sx={{ fontSize: '0.75rem', p: 0, color: 'primary.main' }}>Add parameter</Typography>}
            checkedIcon={<Typography sx={{ fontSize: '0.75rem' }}>Remove</Typography>}
            name={descriptor.name}
            checked={isChecked}
            onChange={handleToggle}
            inputProps={{ 'aria-label': 'controlled' }}
            sx={{ p: 0, '&:hover': { bgcolor: 'inherit' } }}
          />
        </Grid>
      )}
      {isChecked && (
        <Box>
          <InitializeOption descriptor={descriptor} onChange={handleInput} value={value} isChecked={isChecked} />
        </Box>
      )}
    </Grid>
  );
};
