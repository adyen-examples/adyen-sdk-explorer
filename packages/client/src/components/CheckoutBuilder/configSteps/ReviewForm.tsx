import { Grid } from '@mui/material';
import React from 'react';
import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import ComponentBase from '../../ComponentBase/ComponentBase';
import { Content } from './Content';
import { NavButtons } from './NavButtons';

type ReviewFormProps = {
  configuration: object;
  step: number;
  setActiveStep: (step: number) => void;
  content: any;
};

export const ReviewForm = ({ configuration, step, setActiveStep, content }: ReviewFormProps) => {
  return (
    <React.Fragment>
      <Grid mt={2} spacing={1} ml={0} container>
        <Grid item xs={12}>
          <Content title={content.title} version={content.version} description={content.description} />
          <ComponentBase />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
