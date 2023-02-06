import { Box, Button, Grid, Typography, Tabs, Tab } from '@mui/material';
import { fontSize } from '@mui/system';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import type { RootState } from '../../../store';
import { NavButtons } from '../../CheckoutBuilder/configSteps';
import { Input } from './Input';
import { Review } from './Review';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface EditorWrapperProps {
  dimensions: object;
}

export const EditorWrapper = ({ dimensions }: any) => {
  const { buttonHeight, headerHeight, editorWidth } = dimensions;
  const { profile, checkout, local, sessions, sessionsResponse, activeStep } = useSelector((state: RootState) => state.onDeck);
  const configuration: any = { profile, checkout, local, sessions };
  const { steps } = useSelector((state: RootState) => state.sdkExplorer);
  const { updateProfileInfo, updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateStep } = onDeckActions;
  const dispatch = useAppDispatch();
  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };

  const [viewOnly, setViewOnly] = useState(true);
  const [tab, setTab] = useState(0);

  const handleEdit = () => {
    setViewOnly(!viewOnly);
  };

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

  const fixes = {
    checkout: {
      prefix: `
  const checkout = await AdyenCheckout(`,
      postfix: `    );

  checkout.create('${profile.product}', {...});`
    },
    local: {
      prefix: `
  const checkout = await AdyenCheckout({...});
          
  checkout.create('${profile.product}',`,
      postfix: `    );`
    },
    sessions: {
      prefix: `
  Request:`,
      postfix: ''
    }
  };

  let editor = null;
  let step = null;
  let category = null;
  let buildStep = null;

  switch (steps[activeStep]) {
    case 'checkout':
      editor = (
        <Box>
          <Grid
            justifyContent="space-between"
            alignItems="flex-start"
            px={5}
            pt={'12px'}
            pb={'11px'}
            sx={{ backgroundColor: 'secondary.light', borderBottom: 1, borderColor: 'rgba(0, 0, 0, 0.12)' }}
            container
          >
            <Grid item xs={1}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                JS
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <ContentCopyIcon sx={{ fontSize: '17px', fontWeight: 'bold' }} />
            </Grid>
          </Grid>
          <Input
            data={checkout}
            prefix={fixes.checkout.prefix}
            postfix={fixes.checkout.postfix}
            handleEditorUpdate={(value: any) => {
              updateStore(value, updateCheckoutInfo);
            }}
            viewOnly={viewOnly}
          />
        </Box>
      );
      buildStep = 0;
      category = 'Code';
      step = 'checkout';
      break;
    case 'local':
      editor = (
        <Box>
          <Grid
            justifyContent="space-between"
            alignItems="flex-start"
            px={5}
            pt={'12px'}
            pb={'11px'}
            sx={{ backgroundColor: 'secondary.light', borderBottom: 1, borderColor: 'rgba(0, 0, 0, 0.12)' }}
            container
          >
            <Grid item xs={1}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                JS
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <ContentCopyIcon sx={{ fontSize: '17px', fontWeight: 'bold' }} />
            </Grid>
          </Grid>
          <Input
            data={local}
            prefix={fixes.local.prefix}
            postfix={fixes.local.postfix}
            handleEditorUpdate={(value: any) => {
              updateStore(value, updateLocalInfo);
            }}
            viewOnly={viewOnly}
          />
        </Box>
      );
      buildStep = 0;
      step = 'local';
      category = 'Code';
      break;
    case 'sessions':
      editor = (
        <Box>
          <Grid
            justifyContent="space-between"
            alignItems="flex-start"
            px={5}
            pt={'12px'}
            pb={'11px'}
            sx={{ backgroundColor: 'secondary.light', borderBottom: 1, borderColor: 'rgba(0, 0, 0, 0.12)' }}
            container
          >
            <Grid item xs={1}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                API
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <ContentCopyIcon sx={{ fontSize: '17px', fontWeight: 'bold' }} />
            </Grid>
          </Grid>
          <Input
            data={sessions}
            prefix={fixes.sessions.prefix}
            postfix={fixes.sessions.postfix}
            handleEditorUpdate={(value: any) => {
              updateStore(value, updateSessionsInfo);
            }}
            viewOnly={viewOnly}
          />
        </Box>
      );
      buildStep = 1;
      step = 'sessions';
      category = 'API';
      break;
    case 'review':
      editor = (
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
            <Tabs onChange={handleChange} value={buildStep !== null ? buildStep : tab} centered>
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
              prefix={`checkout.create('${profile.product}',`}
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
      buildStep = null;
      step = 'review';
      break;
    default:
      throw new Error('Unknown step');
  }

  return (
    <Box>
      <Box
        sx={{
          borderLeft: 2,
          borderColor: 'secondary.light',
          position: 'fixed',
          top: 0,
          right: 0,
          bgcolor: 'primary.light',
          height: `calc(100% - ${headerHeight}px)`,
          mt: `${headerHeight}px`,
          pb: `${buttonHeight}px`,
          width: `${editorWidth}px`,
          display: {
            xs: 'none',
            sm: 'none',
            md: 'block',
            lg: 'block',
            xl: 'block'
          }
        }}
      >
        {editor}
      </Box>
      <Grid container direction="row" justifyContent="space-between" sx={{ position: 'fixed', bottom: 0, right: 0, width: `${editorWidth}px` }} p={1}>
        <Grid
          item
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'block'
            }
          }}
        >
          <Button
            onClick={handleEdit}
            sx={{
              display: `${step === 'review' ? 'none' : 'inline-block'}`,
              bgcolor: `${viewOnly ? '#0abf53' : '#ff5722'}`,
              '&:hover': { bgcolor: `${viewOnly ? '#388e3c' : '#bf360c'}` }
            }}
            variant="contained"
          >
            {viewOnly ? 'Edit' : 'View Only'}
          </Button>
        </Grid>
        <Grid item>
          <NavButtons
            steps={steps}
            step={activeStep}
            setActiveStep={updateStep}
            configuration={step === 'review' ? configuration : configuration[step]}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
