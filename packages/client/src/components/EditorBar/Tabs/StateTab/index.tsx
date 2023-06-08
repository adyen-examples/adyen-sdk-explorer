import { Box, Typography } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const StateTab = (props: any) => {
  const { adyenComponent, ...other } = props;

  return (
    <Box>
      <Box>
        <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
          STATE
        </Typography>
      </Box>
      {adyenComponent && (
        <Box px={2}>
          <Box sx={{ border: 1, borderRadius: 1, borderColor: 'primary.light', px: 1, bgcolor: '#00112C' }}>
            <EditorPrePostFix
              data={adyenComponent}
              handleEditorUpdate={(value: any) => {
                console.log(value);
              }}
              viewOnly={true}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
