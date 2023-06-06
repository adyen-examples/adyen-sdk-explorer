import { Box } from '@mui/material';

export const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;
  return <Box {...other}>{value === index && <Box component={'span'}>{children}</Box>}</Box>;
};
