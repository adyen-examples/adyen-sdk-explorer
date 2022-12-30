import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import type { OnDeckPropType } from '../types';
type EditorProps = {
  configuration: OnDeckPropType;
  handleJsonEditorUpdate: (e: any) => void;
};

type HandleChange = (e: any) => void;

export const Editor = ({ configuration, handleJsonEditorUpdate }: EditorProps) => {
  const handleChange: HandleChange = e => {
    const { error, jsObject } = e;

    if (jsObject && !error) {
      handleJsonEditorUpdate(jsObject);
    }
  };

  console.log('configuration ./Editor: ', configuration);

  return (
    <JSONInput
      onChange={(e: any) => handleChange(e)}
      placeholder={{ ...configuration }}
      colors={dark_vscode_tribute}
      locale={localeEn}
      height="100%"
      width="100%"
      style={{
        labels: {
          display: 'none'
        }
      }}
    />
  );
};
