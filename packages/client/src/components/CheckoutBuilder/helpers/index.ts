import type { Descriptor } from '../types';

export type DefaultValue = string | boolean | number | any[] | Record<string, unknown> | null;
export type HandleUpdateConfig = (configuration: Record<string, any>, item: string, value: any, current: string) => Record<string, any>;
export type AddOrRemoveProp = (configuration: Record<string, any>, item: string, descriptor: Descriptor) => Record<string, any>;

export const handleUpdateConfig: HandleUpdateConfig = (configuration, item, value, current) => {
  return {
    ...configuration,
    [current]: {
      ...configuration[current],
      [item]: value
    }
  };
};

const checkForNested = (descriptor: Descriptor): any => {
  if (!descriptor) {
    return '';
  }
  if (descriptor.type === 'object' && !descriptor.properties) {
    return {};
  }
  if (descriptor.properties && descriptor.properties.length) {
    return descriptor.properties.reduce((acc, { name }) => ({ ...acc, [name]: '' }), {});
  }
  if (descriptor.type === 'array' && descriptor.items && descriptor.items.constructor === Array) {
    return [descriptor.items.reduce((acc, { name }) => ({ ...acc, [name]: '' }), {})];
  }
  return '';
};

const setDefaultType = (descriptor: Descriptor): DefaultValue => {
  let defaultValue: DefaultValue = '';
  if (descriptor.type) {
    switch (descriptor.type) {
      case 'string':
        defaultValue = '';
        break;
      case 'boolean':
        defaultValue = true;
        break;
      case 'integer':
        defaultValue = 0;
        break;
      case 'array':
        defaultValue = [];
        break;
      case 'object':
        defaultValue = {};
        break;
      default:
        defaultValue = '';
        break;
    }
  } else {
    defaultValue = checkForNested(descriptor);
  }
  return defaultValue;
};

export const addOrRemoveProp: AddOrRemoveProp = (configuration, item, descriptor) => {
  const newConfig = { ...(configuration || {}) };

  if (newConfig[item]) {
    delete newConfig[item];
  } else {
    const value = descriptor ? setDefaultType(descriptor) : '';
    newConfig[item] = value;
  }

  return newConfig;
};
