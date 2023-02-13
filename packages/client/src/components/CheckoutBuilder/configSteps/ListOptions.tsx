import { Grid, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import React from 'react';
import type { AddOrRemoveProp, Descriptor, UpdateConfig } from '../types';
import { OptionWrapper } from './OptionWrapper';
import { ChangeEvent, Fragment, useState } from 'react';

interface ListOptionsProps {
  descriptors: Descriptor[];
  configuration: any;
  handleUpdateConfig: UpdateConfig;
  category: string;
}

export const ListOptions = ({ descriptors, configuration, handleUpdateConfig, category }: ListOptionsProps) => {
  const [filters, setFilters] = useState({
    required: true,
    optional: true
  });

  const { required, optional }: any = filters;

  let displayDescriptors = null;

  if (!required) {
    displayDescriptors = descriptors.filter(descriptor => !descriptor.required);
  } else if (!optional) {
    displayDescriptors = descriptors.filter(descriptor => descriptor.required);
  } else {
    displayDescriptors = descriptors;
  }

  const handleToggle = (name: string) => {
    if (name === 'Required') {
      setFilters({ ...filters, required: !required });
    } else if (name === 'Optional') {
      setFilters({ ...filters, optional: !optional });
    }
  };

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
    <Grid container>
      <Grid item px={7} py={2} mt={2} xs={12} sx={{ backgroundColor: 'secondary.light', boxShadow: 3, position: 'sticky', top: 0 }}>
        <Grid direction="row" justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h5">{category}</Typography>
          </Grid>
          <Grid item>
            <FormGroup row sx={{ '& .MuiCheckbox-root': { py: 0, px: 0.5 } }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    name="Required"
                    checked={required}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleToggle(e.target.name);
                    }}
                    disabled={!optional}
                  />
                }
                label={
                  <Typography sx={{ display: 'inline-block', fontSize: '0.67rem', color: '#00112c', fontWeight: '300' }} variant="caption">
                    Required
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    name="Optional"
                    checked={optional}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleToggle(e.target.name);
                    }}
                    disabled={!required}
                  />
                }
                label={
                  <Typography sx={{ display: 'inline-block', fontSize: '0.67rem', color: '#00112c', fontWeight: '300' }} variant="caption">
                    Optional
                  </Typography>
                }
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
      {displayDescriptors &&
        displayDescriptors.map((descriptor: Descriptor) => {
          return (
            <Grid item mx={7} xs={12} py={3} key={descriptor.name} sx={{ borderBottom: 1, borderColor: 'primary.border' }}>
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
