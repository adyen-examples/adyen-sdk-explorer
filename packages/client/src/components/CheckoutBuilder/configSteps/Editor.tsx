import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import type { OnDeckPropType } from '../types';

type EditorProps = {
  configuration: OnDeckPropType;
  handleJsonEditorUpdate: (e: any) => void;
  viewOnly: boolean;
};

type HandleChange = (e: any) => void;

export const Editor = ({ viewOnly, configuration, handleJsonEditorUpdate }: EditorProps) => {
  const viewOnlyStyle = {
    labels: {
      display: 'none'
    }
  };
  const editStyle = {
    labels: {
      color: '#CE8453'
    }
  };

  const handleChange: HandleChange = e => {
    const { error, jsObject } = e;

    if (jsObject && !error) {
      handleJsonEditorUpdate(jsObject);
    }
  };

  return (
    <JSONInput
      onChange={(e: any) => handleChange(e)}
      placeholder={{ ...configuration }}
      colors={dark_vscode_tribute}
      locale={localeEn}
      height="100%"
      width="100%"
      viewOnly={viewOnly}
      style={viewOnly ? viewOnlyStyle : editStyle}
    />
  );
};
