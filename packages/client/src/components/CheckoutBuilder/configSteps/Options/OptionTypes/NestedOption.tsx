import { Box, Grid, Typography } from '@mui/material';
import { marked } from 'marked';
import { Fragment } from 'react';
import type { Descriptor } from '../../../types';
import { ObjectOption } from './ObjectOption';
import { TextInputField } from './TextInputField';
import type { OptionPropTypes } from './types';
import { BooleanOption } from './BooleanOption';
import { ArrayOption } from './ArrayOption';

export const NestedOption = ({ descriptor, onChange, value }: OptionPropTypes) => {
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

  return (
    <Grid
      container
      sx={{
        border: '1px solid',
        borderColor: 'primary.border',
        borderRadius: 1,
        bgcolor: 'secondary.light',
        input: { bgcolor: 'primary.light' }
      }}
      p={3}
    >
      {descriptor.properties &&
        descriptor.properties.map((prop: Descriptor, i: number, arr: Array<Descriptor>) => {
          return (
            <Fragment key={i}>
              <Grid item xs={12}>
                <Typography sx={{ display: 'inline-block' }} variant="subtitle2">
                  {prop.name}
                </Typography>
                <Typography mx={1} sx={{ display: 'inline-block', fontSize: '0.75rem' }} variant="caption">
                  {prop.type}
                </Typography>
                {prop.required && (
                  <Typography ml={1} sx={{ display: 'inline-block', fontSize: '0.75rem', color: '#ff9800' }} variant="caption">
                    Required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sx={{ 'h6 p': { mt: 0, mb: 1 } }}>
                {prop?.description && createHtmlFromMarkup(prop.description)}
              </Grid>
              {(prop?.type === 'string' || prop.type === 'integer') && (
                <Grid item xs={12}>
                  <TextInputField
                    current={descriptor.name}
                    descriptor={prop}
                    onChange={onChange}
                    value={value[prop.name]}
                    subtitles={false}
                    isChecked={value !== undefined}
                    type={prop.type === 'integer' ? 'number' : 'text'}
                  />
                </Grid>
              )}
              {prop?.type === 'boolean' && <BooleanOption descriptor={prop} onChange={onChange} value={value[prop.name]} />}
              {prop?.type === 'array' && descriptor.name && (
                <Grid item xs={12}>
                  <ArrayOption
                    descriptor={prop}
                    onChange={onChange}
                    value={value[prop.name] ? value[prop.name] : []}
                    isChecked={value !== undefined}
                    current={descriptor.name}
                  />
                </Grid>
              )}
              {i !== arr.length - 1 && (
                <Grid item xs={12} key={prop.name}>
                  <Box sx={{ my: 1, borderBottom: 1, borderColor: 'primary.border', pb: 1 }}></Box>
                </Grid>
              )}
            </Fragment>
          );
        })}
    </Grid>
  );
};
