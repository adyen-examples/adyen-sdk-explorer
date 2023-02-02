import { Box } from '@mui/material';
import { ListOptions } from './configSteps';
import { Content } from './configSteps/Content';
import type { ConfigPropTypes, UpdateConfig } from './types';

export const Config = ({ configuration, descriptors, action, updateStore, content }: ConfigPropTypes) => {
  const handleUpdateConfig: UpdateConfig = (item, value, current): void => {
    let newConfig = { ...configuration };

    if (value === null) {
      delete newConfig[item];
    } else if (current && 'boolean' == typeof value) {
      newConfig = { ...newConfig, [current]: value };
    } else if (current && 'string' == typeof value) {
      let newCurrent = { ...newConfig[current], [item]: value };
      newConfig = { ...newConfig, [current]: newCurrent };
    } else {
      newConfig = { ...newConfig, [item]: value };
    }
    updateStore(newConfig, action);
  };

  return (
    <Box>
      <Content title={content.title} subtitle={content.subtitle} version={content.version} description={content.description} />
      <ListOptions descriptors={descriptors} configuration={configuration} handleUpdateConfig={handleUpdateConfig} />
    </Box>
  );
};
