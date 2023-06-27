import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { EditorPrePostFix } from '../../EditorPrePostFix';
import { StyleDrawers } from './StyleDrawers';

export const StyleEditor = (props: any) => {
  const { style } = useSelector((state: any) => state.onDeck);

  return (
    <Box>
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
        <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: '#00112C', bgcolor: 'secondary.light' }}>
          <Typography sx={{ fontSize: '.7rem', px: 2, color: '#00112C' }} variant="caption">
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
