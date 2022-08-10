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
      <Content title={content.title} version={content.version} description={content.description} />
      <Grid mt={2} container>
        <Grid item xs={12}>
          <ComponentBase />
        </Grid>
      </Grid>
      <Grid
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        container
        sx={{ position: 'fixed', top: 0, right: 0, height: '100vh', bgcolor: 'secondary.main', width: '25%' }}
      >
        <Grid item xs={10} sx={{ height: '90%' }}>
          <JSONInput viewOnly={true} placeholder={configuration} colors={dark_vscode_tribute} locale={localeEn} height="100%" width="100%" />
        </Grid>
        <Grid item xs={1}>
          <Grid p={1} sx={{ height: '100%' }} direction="row" container justifyContent="flex-end" alignItems="flex-end">
            <Grid item>
              <NavButtons step={step} setActiveStep={setActiveStep} configuration={configuration} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
