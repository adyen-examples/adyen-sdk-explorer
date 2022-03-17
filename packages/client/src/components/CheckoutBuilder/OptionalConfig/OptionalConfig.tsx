import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, light_mitsuketa_tribute, localeEn } from '../../../helpers/jsonEditor';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import CheckBox from '@mui/material/CheckBox';
// You are going to need to pass an initial props for the component or dropin version, because what if you dont use sessions
// We are going to have to create a collection of properties, with the type so that we can throw errors if they dont match

interface Content {
  error: object;
  json: string;
  lines: number;
  markupText: string;
  plainText: string;
  jsObject: object;
}

const globalConfigOptions = [
  {
    name: 'showPayButton',
    description: `Show or hides a Pay Button for each payment method. Defaults to true. The Pay button triggers the onSubmit event when
    payment details are valid. If you want to disable the button and then trigger the submit flow on your own, set this to
    false and call the .submit() method from your own button implementation. PayPal Smart Payment Buttons doesn't support
    the .submit() method.`
  },
  {
    name: 'openFirstPaymentMethod',
    description: `When enabled, Drop-in opens the first payment method automatically on page load. Defaults to true.`
  },
  {
    name: 'openFirstStoredPaymentMethod',
    description:
      'When enabled, Drop-in opens the payment method with stored card details on page load. This option takes precedence over openFirstPaymentMethod. Defaults to true.'
  }
];

const localConfigOptions = [
  {
    name: 'amount',
    description: `	Amount to be displayed on the Pay Button. It expects an object with the value and currency properties. For example, { value: 1000, currency: 'USD' }.`
  },
  {
    name: 'showPayButton',
    description: `	Show or hides a Pay Button for each payment method. Defaults to true. The Pay button triggers the onSubmit event when payment details are valid.
        If you want to disable the button and then trigger the submit flow on your own, set this to false and call the .submit() method from your own button implementation. PayPal Smart Payment Buttons doesn't support the .submit() method.`
  }
];

const OptionalConfig = () => {
  // I can put each of these in their own hook, and place each of these in their own component
  // So create one component, and one hook that initializes them
  // I can also pass them what is checked and what is not checked, and have them update the parent state
  // We dont need advanced global state, just create a warning that you are passing an advanced config
  // Should create a hook for the fetch that will get the configs
  // you should fetch them from the parent, and pass them to the children
  // which will set them as their state
  // One component for list config, and one component for editor and they share the same hook
  // They both need access to checked global

  //This should just be rewritten as a hook that fetches data and imported into the list options component
  // We dont need it here
  const [globalValues, setGlobalValues] = useState<object[]>([]);
  const [checkedGlobal, setGlobalChecked] = useState({});

  const [values, setValues] = useState({
    error: '',
    editorError: '',
    success: ''
  });

  const { error, editorError, success } = values;

  useEffect(() => {
    // Here I want to make an API call for get global options and get local options where I pass the solution, api version, and fe library version
    // Ill also need some error handling for the api call.
    initGlobal('dropin');
  }, []);

  const initGlobal = (product: any) => {
    //Here we should fetch our data and add error handling
    setGlobalValues(globalConfigOptions);
  };

  const publishConfig = (e: any) => {
    console.log({
      global: checkedGlobal
    });
  };

  const handleChange = (e: any) => {
    if (!e.error) {
      setGlobalChecked(e.jsObject);
    }
  };

  const listOptions = (options: Array<object>, enabledOptions: any, updateEnabledOptions: any) => {
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
      <React.Fragment>
        <Typography variant="h6">Global Parameters</Typography>
        <Divider />
        {options &&
          options.map((g: any, i) => (
            <React.Fragment>
              <Grid container spacing={3}>
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
              </Grid>
            </React.Fragment>
          ))}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          {listOptions(globalValues, checkedGlobal, setGlobalChecked)}
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={3}>
            <Grid item sx={{ height: '100%' }} xs={12}>
              <JSONInput
                onChange={handleChange}
                placeholder={checkedGlobal}
                colors={dark_vscode_tribute}
                locale={localeEn}
                height="400px"
                width="100%"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OptionalConfig;
