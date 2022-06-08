import { ChangeEvent } from 'react';

export type UpdateConfig = (key: string, value: string | null) => void;

export const addOrRemoveProp = (e: ChangeEvent<HTMLInputElement>, config: any, callback: UpdateConfig): void => {
  const key = e.target.name;
  if (config && config.hasOwnProperty(key)) {
    callback(key, null);
  } else {
    callback(key, '');
  }
};

export const handleInput = (e: ChangeEvent<HTMLInputElement>, callback: UpdateConfig): void => {
  callback(e.target.name, e.target.value);
};

export const checkForNested = (current: any) => {
  let value: any = '';
  if (current.properties && current.properties.length) {
    value = {};
    current.properties.forEach(({ name }: { name: string }) => {
      value[name] = '';
    });
  } else if (current.type === 'array') {
    value = [];
    if (current.items.constructor.name === 'Array') {
      const arrayProto: { [key: string]: string } = {};
      current.items.forEach(({ name }: { name: string }) => {
        arrayProto[name] = '';
      });
      value.push(arrayProto);
    }
  }
  return value;
};
