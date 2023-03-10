import { Box } from '@mui/material';
import { ListOptions } from './configSteps';
import { Content } from './configSteps/Content';
import type { OnDeckPropType } from '../../app/types';
import type { PageContentType } from './helpers/content';

export interface ConfigPropTypes {
  name: string;
  content: PageContentType;
  configuration: OnDeckPropType;
}

export const Config = ({ name, content, configuration }: ConfigPropTypes) => {
  return (
    <Box>
      <Content title={content.title} subtitle={content.subtitle} version={content.version} description={content.description} />
      <ListOptions category={'Parameters'} name={name} configuration={configuration} />
    </Box>
  );
};
