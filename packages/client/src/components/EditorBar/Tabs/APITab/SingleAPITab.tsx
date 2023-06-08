import { Box, Typography } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const SingleAPITab = (props: any) => {
  const { viewOnly, payload, handler, ...other } = props;

  return (
    <Box sx={{ bgcolor: '#00112C', pt: 1 }} {...other}>
      <Box px={2} pb={1}>
        <Typography sx={{ fontSize: '.7rem', color: 'primary.light' }} variant="caption">
          {'/API/SESSIONS/SESSIONSTART'}
        </Typography>
      </Box>
      <Box>
        <Box>
          <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
            {`METHOD: POST`}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
            {`REQUEST: `}
          </Typography>
        </Box>
        <Box px={2}>
          <Box sx={{ border: 1, borderRadius: 1, borderColor: 'primary.light', px: 1, bgcolor: '#00112C' }}>
            <EditorPrePostFix data={payload} handleEditorUpdate={handler} viewOnly={viewOnly} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
