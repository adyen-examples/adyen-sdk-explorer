import * as React from 'react';
import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../helpers/jsonEditor';

const Editor = (props: any) => {
  const { configDictionary, baseConfiguration, setBaseConfiguration } = props;
  const { configuration } = baseConfiguration;
  const optionsType = Object.keys(configDictionary)[0];
  const state = configuration.state[optionsType];

  const handleChange = (e: any) => {
    if (!e.error) {
      configuration.state = { [optionsType]: { ...e.jsObject } };
      setBaseConfiguration({ configuration });
    }
  };

  return (
    <JSONInput
      onChange={handleChange}
      placeholder={{ ...configuration.getConfigOption(optionsType) }}
      colors={dark_vscode_tribute}
      locale={localeEn}
      height="400px"
      width="100%"
    />
  );
};

export default Editor;
