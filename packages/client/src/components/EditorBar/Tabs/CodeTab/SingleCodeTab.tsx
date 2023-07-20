import { Box } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const SingleCodeTab = (props: any) => {
  const { prefix, payload, postfix, handler, viewOnly, ...other } = props;
  const style = {
    '#editor': {
      height: '25vh'
    }
  };

  return (
    <Box {...other} sx={style} m={2}>
      <EditorPrePostFix data={payload} prefix={prefix} postfix={postfix} handleEditorUpdate={handler} viewOnly={viewOnly} />
    </Box>
  );
};
