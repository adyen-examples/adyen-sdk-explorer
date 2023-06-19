export interface PageContentType {
  title: string;
  subtitle: string;
  version: string;
  description: string;
}

export const profilePageContent: PageContentType = {
  title: 'Profile',
  version: 'Web Components/Drop-in v5.19.0',
  subtitle: 'Product TxVariant',
  description:
    "<p>Creates a configuration object for <a href='https://docs.adyen.com/online-payments/web-drop-in'>Web Drop-in</a> and <a href='https://docs.adyen.com/online-payments/web-components'>Web Components</a> integrations.</p> <p>The SDK instance accepts parameters related to itself. You must set global or component-specific configuratiosn either on the main instance of Checkout, on the main instance of dropin, or in the API request.</p> <p>Build and export a configuration profile for future use.</p>"
};
export const globalPageContent: PageContentType = {
  title: 'Set a checkout configuration',
  version: 'Web Components/Drop-in v5.19.0',
  subtitle: 'SDK Version',
  description:
    "<p>Creates a configuration object for <a href='https://docs.adyen.com/online-payments/web-drop-in'>Web Drop-in</a> and <a href='https://docs.adyen.com/online-payments/web-components'>Web Components</a> integrations.</p> <p>The SDK instance accepts parameters related to <a href='https://docs.adyen.com/online-payments/web-drop-in/optional-configuration#optional-adyen-checkout-configuration'>itself</a>. You must set global or component-specific configuratiosn either on the main instance of Checkout, on the main instance of dropin, or in the API request.</p> <p>Build and export a configuration profile for future use.</p>"
};
export const localPageContent: PageContentType = {
  title: 'Set a component configuration',
  subtitle: 'SDK Version',
  version: 'Web Components/Drop-in v5.19.0',
  description:
    'Set a configuration that is specific to the component on the products instance. Note, you can manually add additional key value pairs to this configuration by clicking the edit button.'
};
export const apiPageContent: PageContentType = {
  title: 'Set your API parameters',
  subtitle: 'Endpoint destination URL',
  version: 'https://checkout-test.adyen.com/v69/sessions',
  description:
    'Set a configuration at the API level to be passed on the /sessions endpoint. Note, you can manually add additional key value pairs to this configuration by clicking the edit button.'
};
export const reviewPageContent: PageContentType = {
  title: 'Checkout your build',
  version: 'Web Components/Drop-in v5.19.0',
  subtitle: 'Export',
  description:
    'Review the component that was rendered based on your configuration. If you receive an error go back and reconfigure the SDK. If you would like to export your configuration, click the export button on the right hand side.'
};
