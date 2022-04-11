import { useState } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../helpers/jsonEditor';

const Editor = (props: any) => {
  const { configDictionary, configuration, setConfiguration } = props;
  /*
  TODO: when starting state is loaded, have placeholders reflecting possible values

  // const optionsType = Object.keys(configDictionary)[0];
  // const state = configuration[optionsType] | '';
  */
  return <JSONInput onChange={setConfiguration} colors={dark_vscode_tribute} locale={localeEn} height="400px" width="100%" />;
};

export default Editor;
