import { Grid, Box } from '@mui/material';
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
    <Box>
      <Content title={content.title} version={content.version} description={content.description} />
      <Box px={7} my={5}>
        <ComponentBase />
      </Box>
    </Box>
  );
};
