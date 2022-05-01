import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import type { ConfigTypes } from '../types';
type EditorProps = {
  configuration: ConfigTypes;
  handleJsonEditorUpdate: (e: any) => void;
};

export const Editor = ({ configuration, handleJsonEditorUpdate }: EditorProps) => {
  return (
    <JSONInput
      onChange={handleJsonEditorUpdate}
      placeholder={{ ...configuration }}
      colors={dark_vscode_tribute}
      locale={localeEn}
      height="400px"
      width="100%"
    />
  );
};
