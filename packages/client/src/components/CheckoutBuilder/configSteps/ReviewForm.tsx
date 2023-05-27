import { Box, Typography, Grid } from '@mui/material';
import { ComponentBase } from '../../ComponentBuilder';
import { Content } from './Content';

type ReviewFormProps = {
  configuration: object;
  content: any;
};

export const ReviewForm = ({ content }: ReviewFormProps) => {
  return (
    <Box>
      <Content title={content.title} version={content.version} description={content.description} />
      <Grid
        item
        direction="row"
        justifyContent="space-between"
        container
        px={7}
        py={1.2}
        mt={2}
        xs={12}
        sx={{ backgroundColor: 'secondary.light', boxShadow: 3, position: 'sticky', top: 0, zIndex: 1 }}
      >
        <Grid item>
          <Typography variant="h5">Review & Export</Typography>
        </Grid>
      </Grid>
      <Box p={5}>
        <ComponentBase />
      </Box>
    </Box>
  );
};
