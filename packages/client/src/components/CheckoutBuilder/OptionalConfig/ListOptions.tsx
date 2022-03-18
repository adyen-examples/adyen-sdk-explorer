import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const ListOptions = (props: any) => {
  const { options, enabledOptions, updateEnabledOptions } = props;

  const handleToggle = (t: any) => () => {
    const all: any = { ...enabledOptions };
    if (all.hasOwnProperty(t)) {
      delete all[t];
    } else {
      all[t] = '';
    }
    updateEnabledOptions(all);
  };

  const handleInput = (t: any) => (e: any) => {
    const all: any = { ...enabledOptions };
    all[t] = e.target.value;
    updateEnabledOptions(all);
  };
  return (
    <Grid container rowSpacing={2}>
      {options &&
        options.map((g: any, i: any) => (
          <Grid item xs={11}>
            <Checkbox
              checked={enabledOptions.hasOwnProperty(g.name)}
              onChange={handleToggle(g.name)}
              inputProps={{ 'aria-label': 'controlled' }}
              size="small"
            />
            <Typography variant="overline">{g.name}</Typography>
            <Typography variant="subtitle2">{g.description}</Typography>
            {enabledOptions.hasOwnProperty(g.name) && (
              <TextField onChange={handleInput(g.name)} id="showPayButton" label={g.name} defaultValue={''} fullWidth />
            )}
          </Grid>
        ))}
    </Grid>
  );
};

export default ListOptions;
