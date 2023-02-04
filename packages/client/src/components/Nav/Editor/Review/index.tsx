import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Input } from '../Input';

interface ReviewProps {
  fixes: any;
  data: any;
}

export const Review = ({ fixes, data }: ReviewProps) => {
  const [tab, setTab] = useState(0);
  const { checkout, local, sessions } = fixes;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'secondary.gray',
          '.MuiTabs-indicator': { bgcolor: 'secondary.main' },
          '.MuiTab-root.Mui-selected': { color: 'secondary.main' }
        }}
      >
        <Tabs value={tab} onChange={handleChange} centered>
          <Tab
            label={
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                code
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
          data={data.checkout}
          prefix={`const checkout = await AdyenCheckout(`}
          postfix={`);`}
          handleEditorUpdate={(value: any) => {
            console.log(value);
          }}
          viewOnly={true}
        />
        <Input
          data={data.local}
          prefix={`checkout.create('${data.profile.product}',`}
          postfix={`);`}
          handleEditorUpdate={(value: any) => {
            console.log(value);
          }}
          viewOnly={true}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Input
          data={data.sessions}
          prefix={`Request:`}
          postfix={''}
          handleEditorUpdate={(value: any) => {
            console.log(value);
          }}
          viewOnly={true}
        />
        <Input
          data={data.sessionsResponse}
          prefix={`Response:`}
          postfix={''}
          handleEditorUpdate={(value: any) => {
            console.log(value);
          }}
          viewOnly={true}
        />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        {JSON.stringify(sessions)}
      </TabPanel>
    </Box>
  );
};
