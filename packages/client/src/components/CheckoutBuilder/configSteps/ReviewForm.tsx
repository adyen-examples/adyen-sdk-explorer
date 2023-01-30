import { Box } from '@mui/material';
import ComponentBase from '../../ComponentBase/ComponentBase';
import { Content } from './Content';

type ReviewFormProps = {
  configuration: object;
  content: any;
};

export const ReviewForm = ({ content }: ReviewFormProps) => {
  return (
    <Box>
      <Content title={content.title} version={content.version} description={content.description} />
      <Box px={7} my={5}>
        <ComponentBase />
      </Box>
    </Box>
  );
};
