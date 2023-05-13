import { Box } from '@mui/material';
import { Editor } from '../Editor';

export const EditorPrePostFix = ({ prefix, postfix, data, handleEditorUpdate, viewOnly }: any) => {
  const codeBlock = (prefix: any, postfix: any) => (
    <Box>
      {prefix && (
        <Box>
          <Box>
            <pre style={{ marginTop: '0px', marginBottom: '0px' }}>
              <code style={{ fontSize: '0.9rem' }}>{prefix}</code>
            </pre>
          </Box>
        </Box>
      )}
      <Box>
        <Editor viewOnly={viewOnly} configuration={data} handleJsonEditorUpdate={handleEditorUpdate} />
      </Box>
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

  return (
    <Box>
      <Box sx={{ overflow: 'scroll' }}>{codeBlock(prefix, postfix)}</Box>
    </Box>
  );
};
