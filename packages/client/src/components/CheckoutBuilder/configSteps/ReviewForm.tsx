import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';

export const ReviewForm = (props: any) => {
  const { configuration } = props;

  return <JSONInput viewOnly={true} placeholder={configuration} colors={dark_vscode_tribute} locale={localeEn} height="700px" width="100%" />;
};
