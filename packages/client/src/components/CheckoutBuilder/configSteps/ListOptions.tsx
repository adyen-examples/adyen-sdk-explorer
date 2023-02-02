import { Grid } from '@mui/material';
import type { AddOrRemoveProp, Descriptor, HandleInput, UpdateConfig } from '../types';
import { OptionWrapper } from './OptionWrapper';

interface ListOptionsProps {
  descriptors: Descriptor[];
  configuration: any;
  handleUpdateConfig: UpdateConfig;
}

export const ListOptions = ({ descriptors, configuration, handleUpdateConfig }: ListOptionsProps) => {
  const checkForNested = (current: Descriptor) => {
    let value: any = '';
    if (current.properties && current.properties.length) {
      value = {};
      current.properties.forEach(({ name }: { name: string }) => {
        value[name] = '';
      });
    } else if (current.type === 'array' && current.items) {
      value = [];
      if (current.items.constructor === Array) {
        const arrayProto: { [key: string]: string } = {};
        current.items.forEach(({ name }: { name: string }) => {
          arrayProto[name] = '';
        });
        value.push(arrayProto);
      }
    }
    return value;
  };

  const setDefaultType = (descriptor: Descriptor) => {
    let defaultValue = null;
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
      return defaultValue;
    }

    return checkForNested(descriptor);
  };

  const addOrRemoveProp: AddOrRemoveProp = e => {
    const key: string = e.target.name;
    console.log('KEY', key);
    const descriptor = descriptors.find(descriptor => descriptor.name === key);
    if (configuration && configuration.hasOwnProperty(key)) {
      handleUpdateConfig(key, null);
    } else {
      const value = descriptor ? setDefaultType(descriptor) : '';
      handleUpdateConfig(key, value);
    }
  };

  return (
    <Grid px={7} container>
      {descriptors &&
        descriptors.map((descriptor: Descriptor) => {
          return (
            <Grid item xs={12} py={3} key={descriptor.name} sx={{ borderBottom: 1, borderColor: 'primary.border' }}>
              <OptionWrapper
                descriptor={descriptor}
                indexKey={descriptor.name}
                addOrRemoveProp={addOrRemoveProp}
                handleInput={handleUpdateConfig}
                value={configuration[descriptor.name]}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};
