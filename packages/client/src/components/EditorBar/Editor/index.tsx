import { Box } from '@mui/material';
import JSONInput from 'react-json-editor-ajrm';
import { light_mitsuketa_tribute, dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import type { OnDeckPropType } from '../../CheckoutBuilder/types';

type EditorProps = {
  configuration: OnDeckPropType;
  handleJsonEditorUpdate: (e: any) => void;
  viewOnly: boolean;
  color?: string;
};

type HandleChange = (e: any) => void;

export const Editor = ({ viewOnly, configuration, handleJsonEditorUpdate, color }: EditorProps) => {
  let editorTheme = dark_vscode_tribute;

  if (color && color === 'light') {
    editorTheme = light_mitsuketa_tribute;
  }

  const handleChange: HandleChange = e => {
    const { error, jsObject } = e;

    if (jsObject && !error) {
      handleJsonEditorUpdate(jsObject);
    }
  };

  return (
    <Box
      sx={{
        my: 2,
        p: 1,
        bgcolor: `${color === 'light' ? '#f3f6f9' : '#00112C'}`,
        borderColor: `${color === 'light' ? '#00112C' : 'primary.light'}`,
        border: 1,
        svg: { display: 'none' },
        borderRadius: 2,
        '[name="labels"]': { width: '35px !important' },
        minHeight: '25vh'
      }}
    >
      <JSONInput
        onChange={(e: any) => handleChange(e)}
        placeholder={{ ...configuration }}
        colors={editorTheme}
        locale={localeEn}
        height="100%"
        width="100%"
        viewOnly={viewOnly}
        style={{ body: { fontSize: '0.8rem' } }}
      />
    </Box>
  );
};
