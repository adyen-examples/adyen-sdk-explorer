import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';

const ListOptions = (props: any) => {
  const { configDictionary, configuration, setConfiguration } = props;
  const optionsType = Object.keys(configDictionary)[0];
  const configList = configDictionary[optionsType];
  const { optionalConfiguration } = configuration;
  const thisConfiguration = optionalConfiguration[optionsType];

  const handleToggle = (t: any) => () => {
    const all: any = { ...configuration };

    if (all.optionalConfiguration[optionsType].hasOwnProperty(t)) {
      delete all.optionalConfiguration[optionsType][t];
    } else {
      all.optionalConfiguration[optionsType][t] = '';
    }
    setConfiguration(all);
  };

  const handleInput = (t: any) => (e: any) => {
    const all: any = { ...configuration };
    all.optionalConfiguration[optionsType][t] = e.target.value;
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
              <TextField onChange={handleInput(g.name)} id="showPayButton" label={g.name} defaultValue={''} fullWidth />
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
