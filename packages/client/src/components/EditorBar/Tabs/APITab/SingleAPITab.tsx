import { Box, Typography } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const SingleAPITab = (props: any) => {
  const { viewOnly, payload, handler, ...other } = props;

  return (
    <Box sx={{ pt: 1 }} {...other}>
      <Box>
        <Box px={2}>
          <Box>
            <EditorPrePostFix color="light" data={payload} handleEditorUpdate={handler} viewOnly={viewOnly} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
