import { Grid, Link, Typography, Box } from '@mui/material';

export const LogosGrid = ({ logos }: any) => {
  return (
    <Grid container sx={{ px: 2 }}>
      {logos.map((logo: any) => (
        <Grid key={logo.title} item xs={12} md={4} sx={{ display: 'flex', px: 2, py: 6 }}>
          <Box>{logo.svg()}</Box>
          <Box sx={{ flex: '1 1 0', pl: 1 }}>
            <Typography variant="h5">{logo.title}</Typography>
            <Typography variant="h6">{logo.description}</Typography>
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
