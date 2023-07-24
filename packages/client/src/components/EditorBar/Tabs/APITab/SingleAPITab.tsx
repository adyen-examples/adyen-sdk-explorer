import { Box, Typography } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const SingleAPITab = (props: any) => {
  const { viewOnly, payload, handler, ...other } = props;
  const style = {
    px: 2,
    pb: 2,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: 0,
    bgcolor: 'background.default',
    '#editor': {
      borderTop: 0,
      borderRadius: '0px 0px 4px 4px',
      flex: 1
    },
    '#api-header': {
      border: 1,
      mt: 2,
      py: 2,
      px: 3,
      borderColor: 'primary.border',
      fontWeight: 'bold',
      color: 'secondary.main',
      fontSize: '.9rem',
      borderRadius: '4px 4px 0px 0px'
    },
    '#editor-prefix-postfix': { flex: '1', display: 'flex', flexDirection: 'column', height: 0 }
  };

  return (
    <Box sx={style} {...other}>
      <Typography id="api-header" variant="h6">
        /sessions
      </Typography>
      <EditorPrePostFix data={payload} handleEditorUpdate={handler} viewOnly={viewOnly} id="editor-prefix-postfix" />
    </Box>
  );
};
