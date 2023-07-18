import { Box } from '@mui/material';
import { Editor } from '../Editor';

export const EditorPrePostFix = (props: any) => {
  const { prefix, postfix, data, handleEditorUpdate, viewOnly, color, sx, ...other } = props;

  return (
    <Box sx={{ overflow: 'scroll' }} {...other}>
      <Box mt={0}>
        {prefix && (
          <Box>
            <Box>
              <pre style={{ marginTop: '0px', marginBottom: '0px' }}>
                <code style={{ fontSize: '0.9rem' }}>{prefix}</code>
              </pre>
            </Box>
          </Box>
        )}
          <Editor sx={sx} color={color} viewOnly={viewOnly} configuration={data} handleJsonEditorUpdate={handleEditorUpdate} />
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
    </Box>
  );
};
