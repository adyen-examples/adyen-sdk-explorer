import { Grid, Link, Typography } from '@mui/material';

export const LogosGrid = ({ logos }: any) => {
  return (
    <Grid container>
      {logos.map((logo: any) => (
        <Grid item>
          {logo.svg()}
          <Typography>{logo.title}</Typography>
          <Typography>{logo.description}</Typography>
          <Typography variant="caption">
            <Link href={logo.link}>Learn more</Link>
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};
