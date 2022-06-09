import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import type { OnDeckPropType } from '../types';
type EditorProps = {
  configuration: OnDeckPropType;
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
