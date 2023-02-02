// quick and dirty script to restructure json data for front-end ingest
const fs = require('fs');
// const sessionsReq = require('./sessionsReq.json');
// const { properties } = sessionsReq;

const properties = require('./additionalData.json');
const paymentMethodConfig = require('./schemas/paymentMethodConfig/properties.json');

const extractNames = properties => {
  const names = Object.keys(properties);
  return names.map(name => {
    properties[name].name = name;
    return properties[name];
  });
};

const restructurePaymentMethodConfigData = properties => {
  const restructuredProperties = {};
  properties.forEach(property => {
    restructuredProperties[property.name] = property.properties;
  });
  return restructuredProperties;
};

const createProductsData = properties => {
  const payload = {};
  properties.forEach(property => {
    restructuredProperties[property.name] = property.properties;
  });
};

const loopThru = props => {
  const keys = Object.keys(props);
  return keys.map(key => {
    let current = { ...props[key] };
    if (current.items && current.items.properties) {
      current.items = loopThru(current.items.properties);
    }
    if (current.properties) {
      current.properties = extractNames(current.properties);
    }

    current.name = key;

    return current;
  });
};

const createNewMapping = props => {
  const json = loopThru(props);
  fs.writeFile('./results.json', JSON.stringify(json), err => {
    if (err) console.error(err);
  });
};

const writeNewMapping = props => {
  const json = restructurePaymentMethodConfigData(props);
  console.log(json);
  fs.writeFile('./results.json', JSON.stringify(json), err => {
    if (err) console.error(err);
  });
};

// createNewMapping(properties);
writeNewMapping(paymentMethodConfig);
