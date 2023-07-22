import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { EditorPrePostFix } from '../../EditorPrePostFix';
import { StyleDrawers } from './StyleDrawers';

export const StyleEditor = (props: any) => {
  const { style } = useSelector((state: any) => state.onDeck);
  const editorStyle = {
    '#editor': {
      maxHeight: '50vh'
    }
  };
  
  return (
    <Box sx={editorStyle}>
      <Box p={2}>
        <EditorPrePostFix
          data={style}
          handleEditorUpdate={(value: any) => {
            console.log(value);
          }}
          viewOnly={true}
          color="light"
        />
      </Box>
      <Box pt={2}>
        <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'secondary.main', bgcolor: 'secondary.light' }}>
          <Typography sx={{ fontSize: '.7rem', px: 2, color: 'secondary.main' }} variant="caption">
            PALETTE
          </Typography>
        </Box>
        {Object.keys(style).map((sdkClass: any, i: any) => {
          return <StyleDrawers sdkClass={sdkClass} myStyle={style} key={i} />;
        })}
      </Box>
    </Box>
  );
};
