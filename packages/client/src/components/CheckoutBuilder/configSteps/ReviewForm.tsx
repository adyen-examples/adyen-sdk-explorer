import { Fragment } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import { NavButtons } from './NavButtons';

type ReviewFormProps = {
  configuration: object;
  step: number;
  setActiveStep: (step: number) => void;
};

export const ReviewForm = ({ configuration, step, setActiveStep }: ReviewFormProps) => {
  return (
    <Fragment>
      <JSONInput viewOnly={true} placeholder={configuration} colors={dark_vscode_tribute} locale={localeEn} height="700px" width="100%" />
      <NavButtons step={step} setActiveStep={setActiveStep} configuration={configuration} />
    </Fragment>
  );
};
