import { Box, Divider, Link, Typography } from '@mui/material';
import { ReactComponent as AdyenAuthenticateLogo } from '../../assets/adyen-authenticate-logo.svg';
import { ReactComponent as AdyenHandleLogo } from '../../assets/adyen-handle-logo.svg';
import { ReactComponent as AdyenLogo } from '../../assets/adyen-study-icon.svg';
import { ReactComponent as AdyenVersionLogo } from '../../assets/adyen-version-logo.svg';
import { LogosGrid } from './LogosGrid';
import { LinksGrid } from './LinksGrid';

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

  const links = [
    {
      title: 'Payments',
      subcategories: [
        {
          title: 'Online Payments',
          links: [
            {
              title: 'Checkout',
              url: '',
              description: 'Accept and manage payments made with payment methods from across the world.'
            },
            {
              title: 'Recurring payments',
              url: '',
              description: 'Save payment details and use them for future one-off or subscription payments.'
            },
            {
              title: 'Get notification webhooks',
              url: '',
              description: 'Get updates about payment status changes, payouts, newly available reports, and other events.'
            },
            {
              title: 'Payouts',
              url: '',
              description: 'Send funds to your suppliers, partners, or customers.'
            },
            {
              title: 'BinLookup',
              url: '',
              description: 'Retrieve interchange and scheme fees as well as 3D Secure version support based on a given BIN.'
            },
            {
              title: 'Classic payments integration',
              url: '',
              description: 'Authorize and modify payments using Adyens older payments API.'
            }
          ]
        },
        {
          title: 'In-person payments',
          links: [
            {
              title: 'Create stores',
              url: '',
              description: 'Add a store to your merchant account.'
            },
            {
              title: 'Order terminals',
              url: '',
              description: 'Order payment terminal products and define the delivery address.'
            },
            {
              title: 'Assign terminals',
              url: '',
              description: 'Assign payment terminals to a store for boarding, or reassign them to the inventory or to another store.'
            },
            {
              title: 'Configure terminals',
              url: '',
              description: 'Update payment terminal settings for a company, merchant account, store, or terminal.'
            },
            {
              title: 'Schedule terminals actions',
              url: '',
              description: 'Carry out an action, like installing an Android app, on specific terminals at a specific time.'
            }
          ]
        }
      ]
    },
    {
      title: 'Platforms and financial products',
      subcategories: [
        {
          title: 'Platforms and issuing',
          links: [
            {
              title: 'Configure your platform',
              url: '',
              description: 'Create a platform, onboard users as account holders, create balance accounts, and issue cards and business accounts.'
            },
            {
              title: 'Transfer funds',
              url: '',
              description: 'Move funds within your platform or send funds from your platform to a bank account.'
            },
            {
              title: 'Get notification webhooks',
              url: '',
              description: 'Get updates about events that occur in your platform.'
            }
          ]
        },
        {
          title: 'Classic Platforms',
          links: [
            {
              title: 'Onboard your users',
              url: '',
              description: 'Generate links to Adyen-hosted pages, such as an onboarding page or a PCI compliance questionnaire.'
            },
            {
              title: 'Manage account-related entities',
              url: '',
              description: 'Manage account-related entities on your platform.'
            },
            {
              title: 'Manage funds',
              url: '',
              description: 'Manage funds in the accounts on your platform.'
            },
            {
              title: 'Configure notifications',
              url: '',
              description: 'Set up and test notifications that inform you of events on your platform.'
            },
            {
              title: 'Get notifications',
              url: '',
              description: 'Get updates about events that occur in your platform.'
            }
          ]
        }
      ]
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
            See our guide to{' '}
            <Link href="https://docs.adyen.com/get-started-with-adyen" underline="none">
              get started with Adyen
            </Link>
          </Typography>
        </Box>
        <Box component="div" sx={{ alignItems: 'flex-end', width: '50%', display: { xs: 'none', sm: 'none', md: 'none', lg: 'inline-block' } }}>
          <AdyenLogo />
        </Box>
      </Box>
      <Divider />
      <LogosGrid logos={logos} />
      <Divider />
      <LinksGrid links={links} />
    </Box>
  );
};
