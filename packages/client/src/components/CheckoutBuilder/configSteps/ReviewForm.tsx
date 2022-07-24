import { Grid } from '@mui/material';
import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import ComponentBase from '../../ComponentBase/ComponentBase';

type ReviewFormProps = {
  configuration: object;
  step: number;
  setActiveStep: (step: number) => void;
};

export const ReviewForm = ({ configuration, step, setActiveStep }: ReviewFormProps) => {
  return (
    <Grid mt={2} container>
      <Grid item xs={7}>
        <ComponentBase />
      </Grid>
      <Grid item xs={5}>
        <div style={{ position: 'sticky', top: 0 }}>
          <Grid container spacing={3}>
            <Grid item sx={{ height: '100%' }} xs={12}>
              <JSONInput viewOnly={true} placeholder={configuration} colors={dark_vscode_tribute} locale={localeEn} height="700px" width="100%" />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};
