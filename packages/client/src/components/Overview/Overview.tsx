import { Grid, Paper, Box, Typography, Divider } from '@mui/material';
import { ReactComponent as AdyenLogo } from '../../assets/adyen-study-icon.svg';

export const Overview = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="div" sx={{ mt: 6, ml: 8, mr: { xs: 8, sm: 8, md: 8, lg: 0 }, width: { xs: '100%', sm: '100%', md: '100%', lg: '50%' } }}>
        <Typography variant="h2">
          Welcome to <br /> Adyen's SDK Explorer
        </Typography>
        <Typography sx={{ mt: 3 }} variant="body2">
          With Adyen's SDK, you can implement and manage a powerful payments solution with a wide range of features, including:
          <ul>
            <li>Praesent sapien massa</li>
            <li>Praesent sapien massa</li>
            <li>Praesent sapien massa</li>
          </ul>
          Our Mobile SDKs enable you to:
          <ul>
            <li>
              Create an end-to-end payment solution for peer-to-peer marketplaces, on-demand services, crowdfunding platforms, and other platform
              business models.
            </li>
            <li>Build your own card program with our customizable card issuing solution.</li>
          </ul>
        </Typography>
        <Divider />
      </Box>
      <Box component="div" sx={{ width: '50%', display: { xs: 'none', sm: 'none', md: 'none', lg: 'inline-block' } }}>
        <AdyenLogo />
      </Box>
    </Box>
  );
};
