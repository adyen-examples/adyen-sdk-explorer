import { Checkbox, Grid, TextField, Typography } from '@mui/material';
import type { ConfigTypes } from '../types';
import type { Descriptor } from '../../../app/types';

type ListOptionsProps = {
  configDictionary: Descriptor[];
  configuration: ConfigTypes;
  setConfiguration: (config: {}) => void;
};

export const ListOptions = ({ configDictionary, configuration, setConfiguration }: ListOptionsProps) => {
  console.log('LIST OPTIONS CONFIG', configuration);

  const handleToggle = (t: string) => () => {
    if (configuration && configuration.hasOwnProperty(t)) {
      setConfiguration({ [t]: null });
    } else {
      setConfiguration({ [t]: '' });
    }
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
            <Checkbox checked={configuration[g.name]} onChange={handleToggle(g.name)} inputProps={{ 'aria-label': 'controlled' }} size="small" />
            <Typography variant="overline">{g.name}</Typography>
            <Typography variant="subtitle2">{g.description}</Typography>
            {configuration[g.name] && (
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
