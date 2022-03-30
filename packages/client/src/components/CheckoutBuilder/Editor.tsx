import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../helpers/jsonEditor';

const Editor = (props: any) => {
  const { configDictionary, configuration, setConfiguration } = props;
  const optionsType = Object.keys(configDictionary)[0];
  const state = configuration[optionsType];

  const handleChange = (e: any) => {
    if (!e.error) {
      const updateOptionalConfiguration = { ...configuration, [optionsType]: { ...e.jsObject } };
      setConfiguration(updateOptionalConfiguration);
    }
  };
  return <JSONInput onChange={handleChange} placeholder={{ ...state }} colors={dark_vscode_tribute} locale={localeEn} height="400px" width="100%" />;
};

export default Editor;
