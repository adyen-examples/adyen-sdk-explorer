import { Box, Grid, Link, Typography } from '@mui/material';

export const LogosGrid = (props: any) => {
  const { logos, ...other } = props;
  return (
    <Grid container {...other}>
      {logos.map((logo: any) => (
        <Grid key={logo.title} item xs={12} md={3} sx={{ display: 'flex', px: 2, py: 6 }}>
          <Box id="logo">{logo.svg()}</Box>
          <Box sx={{ flex: '1 1 0', pl: 1 }}>
            <Typography id="step-title" variant="h5">{logo.title}</Typography>
            <Typography id="step-description" variant="h6">{logo.description}</Typography>
            <Typography variant="caption">
              <Link href={logo.link} underline="none">
                Learn more
              </Link>
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
