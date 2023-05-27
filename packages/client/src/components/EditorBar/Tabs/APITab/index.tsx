import { Box, Typography } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const APITab = (props: any) => {
  const { sessions, sessionsResponse } = props;
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'primary.light', bgcolor: '#00112C' }}>
        <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
          REQUEST
        </Typography>
      </Box>
      <Box p={3}>
        <EditorPrePostFix
          data={sessions}
          handleEditorUpdate={(value: any) => {
            console.log(value);
          }}
          viewOnly={true}
        />
      </Box>
      <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'primary.light', bgcolor: '#00112C', borderLeft: 0 }}>
        <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
          RESPONSE
        </Typography>
      </Box>
      <Box p={3}>
        <EditorPrePostFix
          data={sessionsResponse}
          handleEditorUpdate={(value: any) => {
            console.log(value);
          }}
          viewOnly={true}
        />
      </Box>
    </Box>
  );
};
