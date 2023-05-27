import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { EditorPrePostFix } from '../../EditorPrePostFix';
import { StyleDrawers } from './StyleDrawers';

export const StyleEditor = (props: any) => {
  const { style } = useSelector((state: any) => state.onDeck);

  return (
    <Box sx={{ p: 0 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'primary.light', bgcolor: '#00112C' }}>
        <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
          STYLE
        </Typography>
      </Box>
      <Box p={3}>
        <EditorPrePostFix
          data={style}
          handleEditorUpdate={(value: any) => {
            console.log(value);
          }}
          viewOnly={true}
        />
      </Box>
      <Box>
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
