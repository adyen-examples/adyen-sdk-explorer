import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import type { OnDeckPropType } from '../types';
import { Box } from '@mui/material';

type EditorProps = {
  configuration: OnDeckPropType;
  handleJsonEditorUpdate: (e: any) => void;
  viewOnly: boolean;
};

type HandleChange = (e: any) => void;

export const Editor = ({ viewOnly, configuration, handleJsonEditorUpdate }: EditorProps) => {
  console.log('Setting style, viewOnly = ', viewOnly);

  const handleChange: HandleChange = e => {
    const { error, jsObject } = e;

    if (jsObject && !error) {
      handleJsonEditorUpdate(jsObject);
    }
  };

  return (
    <Box sx={{ svg: { display: `${viewOnly ? 'none' : 'block'}` }, '[name="labels"]': { visibility: `${viewOnly ? 'hidden !important' : 'visible !important'}` } }}>
      <JSONInput
        onChange={(e: any) => handleChange(e)}
        placeholder={{ ...configuration }}
        colors={dark_vscode_tribute}
        locale={localeEn}
        height="100%"
        width="100%"
        viewOnly={viewOnly}
      />
    </Box>
  );
};
