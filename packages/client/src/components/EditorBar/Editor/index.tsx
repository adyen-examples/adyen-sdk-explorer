import { Box } from '@mui/material';
import JSONInput from 'react-json-editor-ajrm';
import { light_mitsuketa_tribute, dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import type { OnDeckPropType } from '../../CheckoutBuilder/types';

type EditorProps = {
  configuration: OnDeckPropType;
  handleJsonEditorUpdate: (e: any) => void;
  viewOnly: boolean;
  color?: string;
  sx?: any;
};

type HandleChange = (e: any) => void;

export const Editor = ({ viewOnly, configuration, handleJsonEditorUpdate, color, sx }: EditorProps) => {
  let editorTheme = dark_vscode_tribute;
  let editorStyle = {
    p: 1,
    bgcolor: `${color === 'light' ? '#f3f6f9' : '#00112C'}`,
    color: `${color === 'light' ? '#dce0e5' : 'primary.light'}`,
    border: 1,
    svg: { display: 'none' },
    borderRadius: 1,
    '[name="labels"]': { width: '35px !important' }
  };
  if (color && color === 'light') {
    editorTheme = light_mitsuketa_tribute;
  }

  const handleChange: HandleChange = e => {
    const { error, jsObject } = e;

    if (jsObject && !error) {
      handleJsonEditorUpdate(jsObject);
    }
  };
  console.log({ ...editorStyle, sx });

  return (
    <Box sx={{ ...editorStyle, ...sx }} id="editor">
      <JSONInput
        onChange={(e: any) => handleChange(e)}
        placeholder={{ ...configuration }}
        colors={editorTheme}
        locale={localeEn}
        width="100%"
        height="100%"
        viewOnly={viewOnly}
        style={{ body: { fontSize: '0.8rem' } }}
      />
    </Box>
  );
};
