import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';

const ListOptions = (props: any) => {
  const { configDictionary, configuration, setConfiguration } = props;

  //Here we will create a getter function for the configuration class that gets the config object from the dictionary provided
  const optionsType = Object.keys(configDictionary)[0];
  const configList = configDictionary[optionsType];

  // const { optionalConfiguration } = configuration;
  // const thisConfiguration = optionalConfiguration[optionsType];


  const thisConfiguration = configuration[optionsType];

  console.log('List options: configuration', configuration);
  

  const handleToggle = (t: any) => () => {
    const all: any = { ...configuration };
    console.log('all',all);
    
    if (all[optionsType].hasOwnProperty(t)) {
      delete all[optionsType][t];
    } else {
      all[optionsType][t] = '';
    }
    setConfiguration(all);
  };

  const handleInput = (t: any) => (e: any) => {
    const all: any = { ...configuration };
    all[optionsType][t] = e.target.value;
    setConfiguration(all);
  };

  return (
    <Grid container rowSpacing={2}>
      {configList &&
        configList.map((g: any, i: any) => (
            <Grid item xs={11}>
              <Checkbox
                checked={thisConfiguration.hasOwnProperty(g.name)}
                onChange={handleToggle(g.name)}
                inputProps={{ 'aria-label': 'controlled' }}
                size="small"
              />
              <Typography variant="overline">{g.name}</Typography>
              <Typography variant="subtitle2">{g.description}</Typography>
              {thisConfiguration.hasOwnProperty(g.name) && (
                <TextField onChange={handleInput(g.name)} id="showPayButton" label={g.name} defaultValue={""} value={thisConfiguration[g.name]} fullWidth />
              )}
            </Grid>

        ))}
    </Grid>
  );

  //   return (
  //     <Typography variant="overline">...Loading</Typography>
  //   )
};

export default ListOptions;
