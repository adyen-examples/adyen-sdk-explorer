import { Box } from '@mui/material';
import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, light_mitsuketa_tribute, localeEn } from '../../../helpers/jsonEditor';
import type { OnDeckPropType } from '../../CheckoutBuilder/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

type EditorProps = {
  configuration: OnDeckPropType;
  handleJsonEditorUpdate: (e: any) => void;
  viewOnly: boolean;
  sx?: any;
};

type HandleChange = (e: any) => void;

export const Editor = ({ viewOnly, configuration, handleJsonEditorUpdate }: EditorProps) => {
  const { theme } = useSelector((state: RootState) => state.onDeck);
  let editorTheme = theme === 'dark' ? dark_vscode_tribute : light_mitsuketa_tribute;
  let editorStyle = {
    p: 1,
    color: 'primary.border',
    border: 1,
    bgcolor: 'secondary.light',
    svg: { display: 'none' },
    borderRadius: 1,
    overflow: 'scroll',
    '[name="labels"]': { width: '35px !important' }
  };

  const handleChange: HandleChange = e => {
    const { error, jsObject } = e;

    if (jsObject && !error) {
      handleJsonEditorUpdate(jsObject);
    }
  };

  return (
    <Box sx={{ ...editorStyle }} id="editor">
      <JSONInput
        onChange={(e: any) => handleChange(e)}
        placeholder={{ ...configuration }}
        colors={editorTheme}
        locale={localeEn}
        width="100%"
        height="100%"
        viewOnly={viewOnly}
        style={{ body: { fontSize: '0.8rem' } }}
        id="json-editor"
      />
    </Box>
  );
};
