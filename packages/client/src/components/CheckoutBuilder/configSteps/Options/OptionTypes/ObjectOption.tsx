import { Box } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import { Grid, Typography } from '@mui/material';

export const ObjectOption = () => {
  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" sx={{ border: '3px solid', borderColor: '#cce0ff' }}>
      <Grid item sx={{ bgcolor: '#cce0ff', color: 'primary.main', position: 'relative' }}>
        <InfoIcon sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} />
        <Box component="span" sx={{ bgcolor: '#cce0ff' }}>
          <InfoIcon sx={{ display: 'inline-block', visibility: 'hidden' }} />
        </Box>
      </Grid>
      <Grid item p={2}>
        <Typography variant="h6">Custom configuration use case. Use the JSON Editor pane.</Typography>
      </Grid>
    </Grid>
  );
};
