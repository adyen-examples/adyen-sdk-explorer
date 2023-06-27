import { Box } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';

export const SingleCodeTab = (props: any) => {
  const { prefix, payload, postfix, handler, viewOnly, ...other } = props;
  return (
    <Box {...other}>
      <Box sx={{ m: 2 }}>
        <EditorPrePostFix color="light" data={payload} prefix={prefix} postfix={postfix} handleEditorUpdate={handler} viewOnly={viewOnly} />
      </Box>
    </Box>
  );
};
