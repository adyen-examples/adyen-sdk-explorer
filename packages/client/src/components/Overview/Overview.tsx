import { Link, Grid, Paper, Box, Typography, Divider } from '@mui/material';
import { LogosGrid } from './LogosGrid';
import { ReactComponent as AdyenLogo } from '../../assets/adyen-study-icon.svg';
import { ReactComponent as AdyenAuthenticateLogo } from '../../assets/adyen-authenticate-logo.svg';
import { ReactComponent as AdyenVersionLogo } from '../../assets/adyen-version-logo.svg';
import { ReactComponent as AdyenHandleLogo } from '../../assets/adyen-handle-logo.svg';

export const Overview = () => {
  const logos = [
    {
      title: 'Authenticate',
      link: 'https://docs.adyen.com/development-resources/api-authentication',
      description: 'Each API request that you make to Adyen is processed through an API credential linked to your company account.',
      svg: () => <AdyenAuthenticateLogo />
    },
    {
      title: 'Version',
      link: 'https://docs.adyen.com/development-resources/versioning',
      description: 'Adyen APIs support resources versioning through a version suffix in the resource URL.',
      svg: () => <AdyenVersionLogo />
    },
    {
      title: 'Response handling',
      link: 'https://docs.adyen.com/development-resources/response-handling',
      description: 'After submitting an API call to Adyen, you receive a response back to inform you that your request was received and processed.',
      svg: () => <AdyenHandleLogo />
    }
  ];
  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="div"
          sx={{ mt: 6, mb: 6, ml: 8, mr: { xs: 8, sm: 8, md: 8, lg: 0 }, width: { xs: '100%', sm: '100%', md: '100%', lg: '50%' } }}
        >
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
            Our Web SDKs enable you to:
            <ul>
              <li>
                Create an end-to-end payment solution for peer-to-peer marketplaces, on-demand services, crowdfunding platforms, and other platform
                business models.
              </li>
              <li>Build your own card program with our customizable card issuing solution.</li>
            </ul>
          </Typography>
          <Typography variant="h5">Not sure where to start</Typography>
          <Typography variant="caption">
            See our guide to <Link href="https://docs.adyen.com/get-started-with-adyen">get started with Adyen</Link>
          </Typography>
        </Box>
        <Box component="div" sx={{ alignItems: 'flex-end', width: '50%', display: { xs: 'none', sm: 'none', md: 'none', lg: 'inline-block' } }}>
          <AdyenLogo />
        </Box>
      </Box>
      <Divider />
      <LogosGrid logos={logos} />
    </Box>
  );
};
