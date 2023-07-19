import { Box } from '@mui/material';
import { Editor } from '../Editor';

export const EditorPrePostFix = (props: any) => {
  const { prefix, postfix, data, handleEditorUpdate, viewOnly, color, ...other } = props;

  return (
    <Box {...other}>
      {prefix && (
        <Box>
          <Box>
            <pre style={{ marginTop: '0px', marginBottom: '0px' }}>
              <code style={{ fontSize: '0.9rem' }}>{prefix}</code>
            </pre>
          </Box>
        </Box>
      )}
      <Editor color={color} viewOnly={viewOnly} configuration={data} handleJsonEditorUpdate={handleEditorUpdate} />
      {postfix && (
        <Box>
          <Box>
            <pre style={{ marginTop: '0px', marginBottom: '0px' }}>
              <code style={{ fontSize: '0.9rem' }}>{postfix}</code>
            </pre>
          </Box>
        </Box>
      )}
    </Box>
  );
};
