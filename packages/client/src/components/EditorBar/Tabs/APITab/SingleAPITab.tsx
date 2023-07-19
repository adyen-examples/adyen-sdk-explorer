import { Box, Typography } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const SingleAPITab = (props: any) => {
  const { viewOnly, payload, handler, ...other } = props;

  return (
    <Box
      sx={{
        px: 2,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        '#editor': {
          borderTop: 0,
          borderRadius: '0px 0px 4px 4px',
          flex: 1
        }
      }}
      {...other}
    >
      <Typography
        sx={{
          border: 1,
          mt: 2,
          py: 2,
          px: 3,
          borderColor: 'primary.border',
          fontWeight: 'bold',
          color: 'secondary.main',
          fontSize: '.9rem',
          borderRadius: '4px 4px 0px 0px'
        }}
        variant="h6"
      >
        /sessions
      </Typography>
      <EditorPrePostFix
        sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}
        color="light"
        data={payload}
        handleEditorUpdate={handler}
        viewOnly={viewOnly}
      />
    </Box>
  );
};
