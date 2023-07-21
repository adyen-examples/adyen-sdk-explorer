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
    overflow: 'scroll',
    '#multi-tab-header .MuiTabs-indicator': { display: 'none' },
    '#multi-tab-header .MuiButtonBase-root': {
      minHeight: '0px',
      height: '35px'
    },
    '#multi-tab-header .MuiTabs-root': {
      minHeight: '0px'
    },
    '#multi-tab-header .MuiTab-root.Mui-selected': {
      color: 'secondary.main',
      borderBottom: 1,
      borderColor: 'secondary.main',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      width: '80px',
      fontWeight: 'bold'
    },
    '#multi-tab-header': {
      bgcolor: 'secondary.light',
      pt: 1,
      boxShadow: '0 2px 4px primary.shadow',
      borderColor: 'primary.light'
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box sx={MultiTabStyle} {...other}>
      <Box id="multi-tab-header">
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
