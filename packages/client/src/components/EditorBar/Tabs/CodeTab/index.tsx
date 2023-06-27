import { Box } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const CodeTab = (props: any) => {
  const { checkout, local, txVariant, ...other } = props;

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
            color="light"
          />
          <EditorPrePostFix
            data={local}
            prefix={`checkout.create('${txVariant}',`}
            postfix={');'}
            handleEditorUpdate={(value: any) => {
              console.log(value);
            }}
            viewOnly={true}
            color="light"
          />
        </Box>
      </Box>
    </Box>
  );
};
