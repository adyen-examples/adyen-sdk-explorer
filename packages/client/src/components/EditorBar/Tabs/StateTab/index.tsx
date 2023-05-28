import { Box, Typography } from '@mui/material';
export const StateTab = (props: any) => {
  const { adyenComponent, ...other } = props;
  console.log('adyenComponent', adyenComponent);
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'primary.light', bgcolor: '#00112C' }}>
        <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
          STATE
        </Typography>
      </Box>
      {/* <Box p={3}>
        <Typography>as;djlfhasdjfhasdl;fha;sdlfha;sdhjf as;dlfhas;ldjfhasdlfjal;skdjf;lkasdjf;lkasdjf;lkajsd;fljasd;lkfjasldjkf;ksdjf</Typography>
      </Box> */}
    </Box>
  );
};
