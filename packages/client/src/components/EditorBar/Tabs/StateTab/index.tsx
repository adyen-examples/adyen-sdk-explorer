import { Box, Typography } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const StateTab = (props: any) => {
  const { adyenComponent, ...other } = props;

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'primary.light', bgcolor: '#00112C' }}>
        <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
          STATE
        </Typography>
      </Box>
      {adyenComponent && (
        <Box px={2}>
          <EditorPrePostFix
            data={adyenComponent}
            handleEditorUpdate={(value: any) => {
              console.log(value);
            }}
            viewOnly={true}
          />
        </Box>
      )}
    </Box>
  );
};
