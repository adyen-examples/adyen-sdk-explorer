const adyenSpecExample = [
  {
    storePaymentMethodMode: {
      description:
        'Indicates if the details of the payment method will be stored for the shopper. Possible values:\n* **disabled** – No details will be stored (default).\n* **askForConsent** – If the `shopperReference` is provided, the UI lets the shopper choose if they want their payment details to be stored.\n* **enabled** – If the `shopperReference` is provided, the details will be stored without asking the shopper for consent.',
      enum: ['askForConsent', 'disabled', 'enabled'],
      type: 'string'
    }
  },
  {
    trustedShopper: {
      description: 'Set to true if the payment should be routed to a trusted MID.',
      type: 'boolean'
    }
  }
];

const adyenSpecTransformer = spec => {
  const specName = Object.keys(spec)[0];
  const specProperties = spec[specName].properties;
  const transformedSpec = { name: specName, type: spec[specName].type, description: spec[specName].description };

  if ('properties' in spec[specName]) {
    transformedSpec.properties = [];
    Object.keys(specProperties).forEach(specProperty => {
      transformedSpec.properties.push({ name: specProperty, ...specProperties[specProperty] });
    });
  }

  console.log(JSON.stringify(transformedSpec) + ',');
  return transformedSpec;
};

adyenSpecExample.forEach(spec => {
  adyenSpecTransformer(spec);
});

// adyenSpecTransformer(adyenSpecExample);
