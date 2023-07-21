import { Box } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const CodeTab = (props: any) => {
  const { checkout, local, txVariant, ...other } = props;
  const style = {
    '#editor': {
      maxHeight: '25vh'
    }
  };

  return (
    <Box p={3} sx={style} {...other}>
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
  );
};
