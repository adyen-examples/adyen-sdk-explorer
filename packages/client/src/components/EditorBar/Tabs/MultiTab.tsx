import { Box, Fade, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { APITab } from './APITab';
import { CodeTab } from './CodeTab';
import { StateTab } from './StateTab';
import { StyleEditor } from './StyleTab';
import { TabPanel } from './TabPanel';

export const MultiTab: any = (props: any) => {
  const [tab, setTab] = useState(0);
  const { checkout, local, txVariant, adyenState, ...other } = props;
  const MultiTabStyle = {
    bgcolor: 'secondary.light',
    pt: 1,
    boxShadow: '0 8px 8px rgba(0,17,44,.04), 0 2px 4px rgba(0,17,44,.08)',
    borderColor: 'primary.light',
    '.MuiTabs-indicator': { display: 'none' },
    '.MuiButtonBase-root': {
      minHeight: '0px',
      height: '35px'
    },
    '.MuiTabs-root': {
      minHeight: '0px'
    },
    '.MuiTab-root.Mui-selected': {
      color: '#00112C',
      borderBottom: 1,
      borderColor: '#00112C',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      width: '80px',
      fontWeight: 'bold'
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box {...other}>
      <Box sx={MultiTabStyle}>
        <Tabs onChange={handleChange} value={tab} centered>
          <Tab
            label={
              <Typography variant="h6" sx={{ fontSize: '.75rem', fontWeight: `${tab === 0 ? 'bold' : 'normal'}` }}>
                js
              </Typography>
            }
            sx={{ color: '#00112C' }}
          />
          <Tab
            label={
              <Typography variant="h6" sx={{ fontSize: '.75rem', fontWeight: `${tab === 1 ? 'bold' : 'normal'}` }}>
                css
              </Typography>
            }
            sx={{ color: '#00112C' }}
          />
          <Tab
            label={
              <Typography variant="h6" sx={{ fontSize: '.75rem', fontWeight: `${tab === 2 ? 'bold' : 'normal'}` }}>
                api
              </Typography>
            }
            sx={{ color: '#00112C' }}
          />
          <Tab
            label={
              <Typography variant="h6" sx={{ fontSize: '.75rem', fontWeight: `${tab === 3 ? 'bold' : 'normal'}` }}>
                logs
              </Typography>
            }
            sx={{ color: '#00112C' }}
          />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <Fade timeout={500} in={tab === 0}>
          <Box>
            <CodeTab checkout={checkout} local={local} txVariant={txVariant} />
          </Box>
        </Fade>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Fade timeout={500} in={tab === 1}>
          <Box>
            <StyleEditor />
          </Box>
        </Fade>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Fade timeout={200} in={tab === 2}>
          <Box>
            <APITab />
          </Box>
        </Fade>
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <Fade timeout={500} in={tab === 3}>
          <Box>
            <StateTab adyenComponent={adyenState} />
          </Box>
        </Fade>
      </TabPanel>
    </Box>
  );
};
