import { Box, Typography } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const SingleAPITab = (props: any) => {
  const { viewOnly, payload, handler, ...other } = props;

  return (
    <Box sx={{ pt: 1 }} {...other}>
      <Box px={2} pb={1}>
        <Typography sx={{ fontSize: '.7rem', color: '#00112C' }} variant="caption">
          {'/API/SESSIONS/SESSIONSTART'}
        </Typography>
      </Box>
      <Box>
        <Box>
          <Typography sx={{ fontSize: '.7rem', px: 2, color: '#00112C' }} variant="caption">
            {`METHOD: POST`}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '.7rem', px: 2, color: '#00112C' }} variant="caption">
            {`REQUEST: `}
          </Typography>
        </Box>
        <Box px={2}>
          <Box>
            <EditorPrePostFix color="light" data={payload} handleEditorUpdate={handler} viewOnly={viewOnly} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
