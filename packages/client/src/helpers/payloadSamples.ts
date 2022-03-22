export const payload = {
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
  ],
  paymentMethod: []
};
