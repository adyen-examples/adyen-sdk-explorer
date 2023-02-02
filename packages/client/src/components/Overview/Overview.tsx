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
      description:
        'Each API request that you make to Adyen is processed through an API credential linked to your company account, and each client is associated with one set of API credentials.',
      svg: () => <AdyenAuthenticateLogo />
    },
    {
      title: 'Version',
      link: 'https://docs.adyen.com/development-resources/versioning',
      description: `Adyen's SDK is open source and available to the public to contribute.`,
      svg: () => <AdyenVersionLogo />
    },
    {
      title: 'Error handling',
      link: 'https://docs.adyen.com/development-resources/response-handling',
      description: 'After instantiating an Adyen solution to your front end, you receive a an error event handler.',
      svg: () => <AdyenHandleLogo />
    }
  ];

  const links = [
    {
      title: 'Online Payments',
      subcategories: [
        {
          title: 'Accept Payments',
          links: [
            {
              title: 'Drop-in',
              url: 'https://docs.adyen.com/online-payments/web-drop-in',
              description:
                'Drop-in is our pre-built UI solution for accepting payments on your website. Drop-in shows all payment methods as a list, in the same block.'
            },
            {
              title: 'Components',
              url: 'https://docs.adyen.com/online-payments/web-components',
              description:
                'Components is our pre-built UI solution for accepting payments on your website. Each component renders a payment method which you can place anywhere on your website.'
            },
            {
              title: 'API only',
              url: 'https://docs.adyen.com/online-payments/api-only',
              description: `Use our APIs and build your own payment form if you want full control over the look and feel of your checkout page. If you'd rather not build your own payment form, use one of our pre-built UI options.`
            },
            {
              title: 'Result codes',
              url: 'https://docs.adyen.com/online-payments/payment-result-codes',
              description: 'Each payment has a resultCode that represents its current state, as well as any actions you should take.'
            },
            {
              title: 'Supported payment methods',
              url: 'https://docs.adyen.com/online-payments/supported-payment-methods',
              description: `If you're using any of our client-side integrations, your integration can readily support many of the payment methods.`
            }
          ]
        },
        {
          title: 'Modifications',
          links: [
            {
              title: 'Capture',
              url: 'https://docs.adyen.com/online-payments/capture',
              description:
                'For payment methods that support separate authorisation and capture, you can capture the payment later, for example after the goods have been shipped. This lets you cancel the payment in case of any issues with the shipment.'
            },
            {
              title: 'Cancel',
              url: 'https://docs.adyen.com/online-payments/cancel',
              description:
                'If you have authorised a payment but do not want to capture it, for example because an item is out of stock, you need to cancel the payment. To specify the payment that you want to cancel, use the pspReference of this payment.'
            },
            {
              title: 'Refund',
              url: 'https://docs.adyen.com/online-payments/refund',
              description: 'You can refund either the full captured amount or a part of the captured amount.'
            },
            {
              title: 'Reversal',
              url: 'https://docs.adyen.com/online-payments/reversal',
              description: 'If you want to return the funds to your shopper, but are not certain whether the payment has been captured or not.'
            },
            {
              title: 'Pre-authorisation and adjustment',
              url: 'https://docs.adyen.com/online-payments/adjust-authorisation',
              description: 'Change the amount or extend the length of the authorisation.'
            }
          ]
        }
      ]
    },
    {
      title: 'Features',
      subcategories: [
        {
          title: '3D Secure 2',
          links: [
            {
              title: 'Redirect',
              url: 'https://docs.adyen.com/online-payments/3d-secure/redirect-3ds2',
              description: 'Provide a redirect URL where the shopper can complete authentication.'
            },
            {
              title: 'Native 3D Secure 2',
              url: 'https://docs.adyen.com/online-payments/3d-secure/native-3ds2',
              description: `The shopper's identity may be verified using passive, biometric, or a two-factor authentication method.`
            },
            {
              title: 'Other 3D Secure Flows',
              url: 'https://docs.adyen.com/online-payments/3d-secure/other-3ds-flows',
              description: 'Depending on your implementation, you can choose to perform the following alternative 3D Secure flows.'
            }
          ]
        },
        {
          title: 'Tokenization',
          links: [
            {
              title: 'Create and use tokens',
              url: 'https://docs.adyen.com/online-payments/tokenization/create-and-use-tokens',
              description: 'With Adyen, you can securely store one or more payment details per shopper.'
            },
            {
              title: 'Manage tokens',
              url: 'https://docs.adyen.com/online-payments/tokenization/managing-tokens',
              description:
                'Your shoppers may need to update the payment methods they saved with you, or request you to remove a previously saved payment detail.'
            }
          ]
        },
        {
          title: 'Accout Updater',
          links: [
            {
              title: 'Real Time Account Updater',
              url: 'https://docs.adyen.com/online-payments/account-updater/real-time-account-updater',
              description: `Our Real Time Account Updater instantly checks with Visa and Mastercard for updated card details. If there's an update, we'll immediately retry the payment with the updated card details.`
            },
            {
              title: 'Batch Account Updater',
              url: 'https://docs.adyen.com/online-payments/account-updater/batch-account-updater',
              description: `Send batch files to request updates for your shoppers' cards. We request the updates from Visa and Mastercard, and receive the new shopper card information.`
            }
          ]
        }
      ]
    }
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap-reverse', justifyContent: 'space-between' }}>
        <Box
          component="div"
          sx={{ mt: 6, mb: 6, ml: 8, mr: { xs: 8, sm: 8, md: 8, lg: 0 }, width: { xs: '100%', sm: '100%', md: '100%', lg: '50%' } }}
        >
          <Typography variant="h2">
            Welcome to <br /> Adyen's SDK Explorer
          </Typography>
          <Typography sx={{ mt: 3 }} variant="body2">
            With Adyen's SDK, you can implement and manage a powerful payments solution with a wide range of features, and customizations. You can
            pass an optional configuration to satisfy your business needs in the following implementation checkpoints:
            <ul>
              <li>Checkout Configuration</li>
              <li>Component Configuration</li>
              <li>API Configuration</li>
            </ul>
            This application will guide you in passing an optional configuration throughout the implementation checkpoints. Our SDK Explorer
            enables you to:
            <ul>
              <li>Quickly configure and construct an Adyen component to your specifications.</li>
              <li>Get up to speed on all of Adyen SDK's optional configurations.</li>
            </ul>
          </Typography>
          <Typography variant="h5">Not sure where to start</Typography>
          <Typography variant="caption">
            See our guide to{' '}
            <Link href="https://docs.adyen.com/online-payments/web-drop-in/optional-configuration" underline="none">
              getting started with Adyen's optional configuration
            </Link>
          </Typography>
        </Box>
        <Box
          component="div"
          sx={{ alignItems: 'flex-end', alignSelf: 'flex-start', width: '50%', flex: 1, display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }}
        >
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
