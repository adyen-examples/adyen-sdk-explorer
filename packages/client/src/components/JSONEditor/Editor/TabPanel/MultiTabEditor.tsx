import { useSelector } from 'react-redux';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { TabPanel } from './TabPanel';
import { Input } from '../Input';

import type { RootState } from '../../../../store';

interface MultiTabEditorProps {
  tab: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const MultiTabEditor = ({ tab, handleChange }: MultiTabEditorProps) => {
  const { txVariant, checkout, local, sessions, sessionsResponse } = useSelector((state: RootState) => state.onDeck);

  return (
    <Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'secondary.gray',
          '.MuiTabs-indicator': { bgcolor: 'secondary.main' },
          '.MuiTab-root.Mui-selected': { color: 'secondary.main' }
        }}
      >
        <Tabs onChange={handleChange} value={tab} centered>
          <Tab
            label={
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                JS
              </Typography>
            }
          />
          <Tab
            label={
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                api
              </Typography>
            }
          />
          <Tab
            label={
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                state
              </Typography>
            }
          />
          <Tab
            label={
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                style
              </Typography>
            }
          />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <Input
          data={checkout}
          prefix={`const checkout = await AdyenCheckout(`}
          postfix={`);`}
          handleEditorUpdate={(value: any) => {
            console.log(value);
          }}
          viewOnly={true}
        />
        <Input
          data={local}
          prefix={`checkout.create('${txVariant}',`}
          postfix={`);`}
          handleEditorUpdate={(value: any) => {
            console.log(value);
          }}
          viewOnly={true}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Input
          data={sessions}
          prefix={`Request:`}
          postfix={''}
          handleEditorUpdate={(value: any) => {
            console.log(value);
          }}
          viewOnly={true}
        />
        <Input
          data={sessionsResponse}
          prefix={`Response:`}
          postfix={''}
          handleEditorUpdate={(value: any) => {
            console.log(value);
          }}
          viewOnly={true}
        />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        {'STATE'}
      </TabPanel>
      <TabPanel value={tab} index={3}>
        {'STYLE'}
      </TabPanel>
    </Box>
  );
};
