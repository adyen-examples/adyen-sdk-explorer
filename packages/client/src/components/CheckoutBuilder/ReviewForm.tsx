import * as React from 'react';
import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../helpers/jsonEditor';

const ReviewForm = (props: any) => {
  const { baseConfiguration } = props;
  const { configuration } = baseConfiguration;
  return <JSONInput viewOnly={true} placeholder={configuration.state} colors={dark_vscode_tribute} locale={localeEn} height="700px" width="100%" />;
};

export default ReviewForm;
