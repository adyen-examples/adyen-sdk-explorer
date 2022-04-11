import { Checkbox, Grid, TextField, Typography } from '@mui/material';
import type { Descriptor } from '../../app/types';

const ListOptions = ({
  configDictionary,
  configuration,
  setConfiguration
}: {
  configDictionary: Descriptor[];
  configuration: { [key: string]: any };
  setConfiguration: (config: {}) => void;
}) => {
  console.log('LIST OPTIONS CONFIG', configuration);

  const handleToggle = (t: any) => () => {
    if (configuration && configuration.hasOwnProperty(t)) {
      delete configuration[t];
    } else {
      configuration[t] = '';
    }
    setConfiguration(configuration);
  };

  const handleInput = (t: any) => (e: any) => {
    configuration[t] = e.target.value;
    setConfiguration(configuration);
  };

  return (
    <Grid container rowSpacing={2}>
      {configDictionary &&
        configDictionary.map((g: any, i: any) => (
          <Grid item xs={11} key={i}>
            <Checkbox
              checked={configuration.hasOwnProperty(g.name)}
              onChange={handleToggle(g.name)}
              inputProps={{ 'aria-label': 'controlled' }}
              size="small"
            />
            <Typography variant="overline">{g.name}</Typography>
            <Typography variant="subtitle2">{g.description}</Typography>
            {configuration.hasOwnProperty(g.name) && (
              <TextField onChange={handleInput(g.name)} id="showPayButton" label={g.name} value={configuration[g.name]} fullWidth />
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
