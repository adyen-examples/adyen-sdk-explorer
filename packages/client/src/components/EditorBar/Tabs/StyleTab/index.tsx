import { Box, Typography, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { EditorPrePostFix } from '../../EditorPrePostFix';
import { StyleDrawers } from './StyleDrawers';

export const StyleEditor = (props: any) => {
  const { style } = useSelector((state: any) => state.onDeck);

  return (
    <Box>
      <Box>
        <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
          STYLE:
        </Typography>
      </Box>
      <Box px={2}>
        <Paper sx={{ border: 1, borderRadius: 1, borderColor: 'primary.light', px: 1, bgcolor: '#00112C' }}>
          <EditorPrePostFix
            data={style}
            handleEditorUpdate={(value: any) => {
              console.log(value);
            }}
            viewOnly={true}
          />
        </Paper>
      </Box>
      <Box pt={2}>
        <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'primary.light', bgcolor: '#00112C' }}>
          <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
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
