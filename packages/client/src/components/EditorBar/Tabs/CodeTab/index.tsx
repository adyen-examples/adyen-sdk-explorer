import { Box, Typography } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const CodeTab = (props: any) => {
  const { checkout, local, profile, ...other } = props;
  return (
    <Box {...other}>
      <Box sx={{ borderBottom: 1, borderColor: 'primary.light', bgcolor: '#00112C' }}>
        <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
          CODE
        </Typography>
      </Box>
      <Box p={3}>
        <Box>
          <EditorPrePostFix
            data={checkout}
            prefix={'const checkout = await AdyenCheckout('}
            postfix={');'}
            handleEditorUpdate={(value: any) => {
              console.log(value);
            }}
            viewOnly={true}
          />
          <EditorPrePostFix
            data={local}
            prefix={`checkout.create('${profile.product}',`}
            postfix={');'}
            handleEditorUpdate={(value: any) => {
              console.log(value);
            }}
            viewOnly={true}
          />
        </Box>
      </Box>
    </Box>
  );
};
