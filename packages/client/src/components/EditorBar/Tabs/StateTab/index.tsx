import { Box, Typography } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const StateTab = (props: any) => {
  const { adyenComponent, ...other } = props;

  return (
    <Box {...other}>
      {adyenComponent && (
        <Box p={2}>
          <Box>
            <EditorPrePostFix
              data={adyenComponent}
              handleEditorUpdate={(value: any) => {
                console.log(value);
              }}
              viewOnly={true}
              color="light"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
