import { Box, Typography } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const SingleAPITab = (props: any) => {
  const { viewOnly, payload, handler, ...other } = props;

  return (
    <Box
      sx={{
        pt: 1,
        px: 2,
        '#editor': {
          borderTop: 0,
          borderRadius: '0px 0px 4px 4px'
        }
      }}
      {...other}
    >
      <Box>
        <Typography
          sx={{
            border: 1,
            mt: 2,
            py: 2,
            px: 3,
            borderColor: '#dce0e5',
            fontWeight: 'bold',
            color: '#000000',
            fontSize: '.9rem',
            borderRadius: '4px 4px 0px 0px'
          }}
          variant="h6"
        >
          /sessions
        </Typography>
        <EditorPrePostFix color="light" data={payload} handleEditorUpdate={handler} viewOnly={viewOnly} />
      </Box>
    </Box>
  );
};
