import { Box, Button, Grid, Typography } from '@mui/material';
import { Editor } from '../../../CheckoutBuilder/configSteps/Editor';

interface InputProps {
  prefix?: string;
  postfix?: string;
  data: any;
  handleEditorUpdate: any;
  viewOnly: boolean;
}

export const Input = ({ prefix, postfix, data, handleEditorUpdate, viewOnly }: any) => {
  const codeBlock = (prefix: any, postfix: any, configurationBlock: any) => (
    <Box>
      {prefix && (
        <Box>
          <Box sx={{ color: 'info.main' }}>
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
          <Box sx={{ color: 'info.main' }}>
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
      <Box sx={{ overflow: 'scroll' }}>{codeBlock(prefix, postfix, data)}</Box>
    </Box>
  );
};
