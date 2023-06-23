import { Fragment } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { TextInputField } from './TextInputField';
import type { Descriptor } from '../../../types';
import type { OptionPropTypes } from './types';
import { marked } from 'marked';

export const NestedOption = ({ descriptor, onChange, value }: OptionPropTypes) => {
  const createMarkup = (description: string) => {
    return { __html: description };
  };

  return (
    <Fragment>
      <Grid
        container
        sx={{ border: '1px solid', borderColor: 'primary.border', borderRadius: 1, bgcolor: 'primary.light', input: { bgcolor: 'secondary.light' } }}
        p={3}
      >
        {descriptor.properties &&
          descriptor.properties.map((prop: Descriptor) => {
            return (
              <Box>
                <Grid item xs={12}>
                  <Typography sx={{ display: 'inline-block' }} variant="subtitle2">
                    {prop.name}
                  </Typography>
                  <Typography mx={1} sx={{ display: 'inline-block', fontSize: '0.75rem' }} variant="caption">
                    {prop.type}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    dangerouslySetInnerHTML={prop?.description ? createMarkup(marked.parse(prop.description)) : undefined}
                  ></Typography>
                </Grid>
                <Grid item xs={7} key={prop.name}>
                  <TextInputField
                    current={descriptor.name}
                    descriptor={prop}
                    onChange={onChange}
                    value={value[prop.name]}
                    subtitles={false}
                    isChecked={value !== undefined}
                  />
                </Grid>
              </Box>
            );
          })}
      </Grid>
    </Fragment>
  );
};
