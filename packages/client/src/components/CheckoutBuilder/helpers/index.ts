import { useAppDispatch } from '../../../hooks';
import type { ChangeEvent } from 'react';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { Descriptor } from '../types';

export type DefaultValue = string | boolean | number | any[] | Record<string, unknown> | null;
export type UpdateConfig = (configuration: any, action: any, key: string, value: DefaultValue, current?: any) => void;
export type AddOrRemoveProp = (e: ChangeEvent<HTMLInputElement>, descriptors: Descriptor[], configuration: any, action: any) => void | undefined;

const dispatch = useAppDispatch();

export const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
  dispatch(action(value));
};

export const handleUpdateConfig: UpdateConfig = (configuration, action, item, value, current): void => {
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
  updateStore(newConfig, action);
};

const checkForNested = (current: Descriptor): any => {
  if (!current) {
    return '';
  }
  if (current.properties && current.properties.length) {
    return current.properties.reduce((acc, { name }) => ({ ...acc, [name]: '' }), {});
  }
  if (current.type === 'array' && current.items && current.items.constructor === Array) {
    return [current.items.reduce((acc, { name }) => ({ ...acc, [name]: '' }), {})];
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

export const addOrRemoveProp: AddOrRemoveProp = (e, descriptors, configuration, action) => {
  const key = e.target.name;
  const descriptor = descriptors.find(d => d.name === key);

  if (configuration && Object.prototype.hasOwnProperty.call(configuration, key)) {
    handleUpdateConfig(configuration, action, key, null);
  } else {
    const value = descriptor ? setDefaultType(descriptor) : '';
    handleUpdateConfig(configuration, action, key, value);
  }
};
