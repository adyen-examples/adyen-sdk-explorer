import { Box, Typography } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const CodeTab = (props: any) => {
  const { checkout, local, profile, ...other } = props;
  return (
    <Box {...other}>
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
