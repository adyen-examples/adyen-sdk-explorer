import { Box, Typography } from '@mui/material';

interface TabPanelProps {
  children: any;
  value: number;
  index: number;
  other?: any;
}

export const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
