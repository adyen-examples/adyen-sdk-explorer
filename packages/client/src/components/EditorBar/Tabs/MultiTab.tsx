import { Box, Slide, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { EditorPrePostFix } from '../EditorPrePostFix';
import { CodeTab } from './CodeTab';
import { StyleEditor } from './StyleTab';
import { TabPanel } from './TabPanel';
import { APITab } from './APITab';
import { StateTab } from './StateTab';

export const MultiTab: any = (props: any) => {
  const [tab, setTab] = useState(0);
  const { checkout, local, profile, sessions, sessionsResponse, adyenState, ...other } = props;
  const MultiTabStyle = {
    bgcolor: 'secondary.light',
    pt: 1,
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
      bgcolor: '#00112C',
      color: 'primary.light',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: 'primary.light',
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
        <Slide timeout={150} direction="right" in={tab === 0 && Object.keys(sessionsResponse).length > 0}>
          <Box>
            <CodeTab checkout={checkout} local={local} profile={profile} />
          </Box>
        </Slide>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Slide timeout={150} direction="right" in={tab === 1 && Object.keys(sessionsResponse).length > 0}>
          <Box>
            <StyleEditor />
          </Box>
        </Slide>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <Slide timeout={150} direction="right" in={tab === 2 && Object.keys(sessionsResponse).length > 0}>
          <Box>
            <APITab sessions={sessions} sessionsResponse={sessionsResponse} />
          </Box>
        </Slide>
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <Slide timeout={150} direction="right" in={tab === 3 && Object.keys(sessionsResponse).length > 0}>
          <Box>
            <StateTab adyenComponent={adyenState}/>
          </Box>
        </Slide>
      </TabPanel>
    </Box>
  );
};
