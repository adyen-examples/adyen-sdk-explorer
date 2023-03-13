import type { ChangeEvent } from 'react';
import type { Descriptor } from '../types';

export type DefaultValue = string | boolean | number | any[] | Record<string, unknown> | null;
export type HandleUpdateConfig = (configuration: any, key: string, value: DefaultValue, current?: any) => void;
export type AddOrRemoveProp = (e: ChangeEvent<HTMLInputElement>, descriptor: Descriptor, configuration: any) => void | undefined;

export const handleUpdateConfig: HandleUpdateConfig = (configuration, item, value, current): void => {
  let newConfig = { ...configuration };

  if (value === null) {
    delete newConfig[item];
  } else if (current) {
    newConfig[current] = {
      ...newConfig[current],
      [item]: value
    };
  } else {
    newConfig[item] = value;
  }

  return newConfig;
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

export const addOrRemoveProp: AddOrRemoveProp = (e, descriptor, configuration) => {
  const key = e.target.name;

  if (configuration && Object.prototype.hasOwnProperty.call(configuration, key)) {
    return handleUpdateConfig(configuration, key, null);
  } else {
    const value = descriptor ? setDefaultType(descriptor) : '';
    return handleUpdateConfig(configuration, key, value);
  }
};
