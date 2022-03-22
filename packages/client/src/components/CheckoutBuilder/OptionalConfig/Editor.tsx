import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import * as React from 'react';

const Editor = (props: any) => {
  const { configDictionary, configuration, setConfiguration } = props;
  const { optionalConfiguration } = configuration;
  const optionsType = Object.keys(configDictionary)[0];
  const state = optionalConfiguration[optionsType];
  const stateObject = state.reduce((obj:any, item:any) => Object.assign(obj, { Object.keys(item)[0]: Object.keys(item)[0] }), {});
  console.log('state',state);
  console.log('state', stateObject);

  // We dont need advanced global state, just create a warning that you are passing an advanced config
  // Need to add an edit button
  const handleChange = (e: any) => {
    //you should be able to pass the name of the api. I think to do that we need to know the definition
    //this will need to handle sending over the entire object
    if (!e.error) {
      setConfiguration(e.jsObject);
    }
  };
  return <JSONInput onChange={handleChange} placeholder={state} colors={dark_vscode_tribute} locale={localeEn} height="400px" width="100%" />;
};

export default Editor;
