import JSONInput from 'react-json-editor-ajrm';
import { dark_vscode_tribute, localeEn } from '../../../helpers/jsonEditor';
import * as React from 'react';

const Editor = (props: any) => {
  const { enabledOptions, updateEnabledOptions } = props;

// We dont need advanced global state, just create a warning that you are passing an advanced config
// Need to add an edit button
  const handleChange = (e: any) => {
    if (!e.error) {
      updateEnabledOptions(e.jsObject);
    }
  };
  return <JSONInput onChange={handleChange} placeholder={enabledOptions} colors={dark_vscode_tribute} locale={localeEn} height="400px" width="100%" />;
};

export default Editor;
