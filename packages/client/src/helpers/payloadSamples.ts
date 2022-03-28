export const getClientConfiguration_Response = {
  globalConfigOptions: [
    {
      name: 'showPayButton',
      description: `Show or hides a Pay Button for each payment method. Defaults to true. The Pay button triggers the onSubmit event when
      payment details are valid. If you want to disable the button and then trigger the submit flow on your own, set this to
      false and call the .submit() method from your own button implementation. PayPal Smart Payment Buttons doesn't support
      the .submit() method.`
    },
    {
      name: 'openFirstPaymentMethod',
      description: `When enabled, Drop-in opens the first payment method automatically on page load. Defaults to true.`
    },
    {
      name: 'openFirstStoredPaymentMethod',
      description:
        'When enabled, Drop-in opens the payment method with stored card details on page load. This option takes precedence over openFirstPaymentMethod. Defaults to true.'
    }
  ],
  localConfigOptions: [
    {
      name: 'amount',
      description: `	Amount to be displayed on the Pay Button. It expects an object with the value and currency properties. For example, { value: 1000, currency: 'USD' }.`
    },
    {
      name: 'showPayButton',
      description: `	Show or hides a Pay Button for each payment method. Defaults to true. The Pay button triggers the onSubmit event when payment details are valid.
          If you want to disable the button and then trigger the submit flow on your own, set this to false and call the .submit() method from your own button implementation. PayPal Smart Payment Buttons doesn't support the .submit() method.`
    }
  ]
};

export const getSessions_Response = {
    sessions: [
      {
        name: 'expiresAt',
        description: `The session expiry date in ISO8601 format, for example 2019-11-23T12:25:28Z, or 2020-05-27T20:25:28+08:00. When not specified, the expiry date is set to 1 hour after session creation. You cannot set the session expiry to more than 24 hours after session creation.`
      },
      {
        name: 'countryCode',
        description: `The shopper's country code. This is used to filter the list of available payment methods to your shopper.`
      },
      {
        name: 'shopperLocale',
        description: `The language that the payment methods will appear in. Set it to the shopper's language and country code. The default is en-US. The front end also uses this locale if it's available.`
      },
      {
        name: 'shopperEmail',
        description: `The shopper's email address. Strongly recommended because this field is used in a number of risk checks, and for 3D Secure.`
      },
      {
        name: 'shopperReference',
        description: `Your reference to uniquely identify this shopper. Strongly recommended because this field is used in a number of risk checks.`
      }
    ]
};
