import { useState, ChangeEvent } from 'react';
import { Checkbox, Grid, TextField, Typography } from '@mui/material';
import { Option } from './Option';
import type { ConfigTypes } from '../types';
import type { Descriptor } from '../../../app/types';

type ListOptionsProps = {
  descriptors: Descriptor[];
  configuration: ConfigTypes;
  handleUpdateConfig: (key: string, value: string | null) => void;
};

export const ListOptions = ({ descriptors, configuration, handleUpdateConfig }: ListOptionsProps) => {
  const addOrRemoveProp = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    if (configuration && configuration.hasOwnProperty(key)) {
      handleUpdateConfig(key, null);
    } else {
      handleUpdateConfig(key, '');
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleUpdateConfig(e.target.name, e.target.value);
  };

  return (
    <Grid container rowSpacing={2}>
      {descriptors &&
        descriptors.map((descriptor: Descriptor, i: number) => (
          <Option
            descriptor={descriptor}
            indexKey={i}
            addOrRemoveProp={addOrRemoveProp}
            handleInput={handleInput}
            value={configuration[descriptor.name]}
          />
        ))}
    </Grid>
  );
};
