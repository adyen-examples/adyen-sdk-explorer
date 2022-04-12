import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const ListOptions = (props: any) => {
  const { configDictionary, baseConfiguration, setBaseConfiguration } = props;
  const { configuration } = baseConfiguration;
  const optionsType = Object.keys(configDictionary)[0];
  const configList = configDictionary[optionsType];
  
  const handleToggle = (t: any) => () => {
    configuration.toggleConfigOption(optionsType, t);
    setBaseConfiguration({configuration});
  };

  const handleInput = (t: any) => (e: any) => {
    configuration.setConfigOption(optionsType, t, e.target.value);
    setBaseConfiguration({configuration});
  };

  return (
    <Grid container rowSpacing={2}>
      {configList &&
        configList.map((g: any, i: any) => (
            <Grid item xs={11} key={i}>
              <Checkbox
                checked={configuration.state[optionsType].hasOwnProperty(g.name)}
                onChange={handleToggle(g.name)}
                inputProps={{ 'aria-label': 'controlled' }}
                size="small"
              />
              <Typography variant="overline">{g.name}</Typography>
              <Typography variant="subtitle2">{g.description}</Typography>
              {configuration.state[optionsType].hasOwnProperty(g.name) && (
                <TextField onChange={handleInput(g.name)} id="showPayButton" label={g.name} value={configuration.state[optionsType][g.name]} fullWidth />
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
