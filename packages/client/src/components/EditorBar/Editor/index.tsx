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
        svg: { display: `${viewOnly ? 'none' : 'block'}` },
        '[name="labels"]': { display: `${viewOnly ? 'none !important' : 'block !important'}` }
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
