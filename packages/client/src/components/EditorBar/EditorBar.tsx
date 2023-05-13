import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../app';
import { useAppDispatch } from '../../hooks';
import type { RootState } from '../../store';
import { NavButtons } from './NavButtons';
import { Input } from './EditorPrePostFix';
import { StyleEditor } from './StyleEditor';

interface EditorDimensions {
  buttonHeight: number;
  headerHeight: number;
  editorWidth: number;
}

interface EditorWrapperProps {
  dimensions: EditorDimensions;
  steps: any;
}

export const EditorWrapper = ({ dimensions, steps }: EditorWrapperProps) => {
  const { buttonHeight, headerHeight, editorWidth } = dimensions;
  const { profile, checkout, local, sessions, sessionsResponse, activeStep } = useSelector((state: RootState) => state.onDeck);
  const configuration: any = { profile, checkout, local, sessions };
  const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateStep } = onDeckActions;
  const dispatch = useAppDispatch();
  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };

  let multiTabEditor = null;
  let step = steps[activeStep];

  const [viewOnly, setViewOnly] = useState(true);
  const [tab, setTab] = useState(0);

  const handleEdit = () => {
    setViewOnly(!viewOnly);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const TabPanel = (props: any) => {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box>
            <Box component={'span'}>{children}</Box>
          </Box>
        )}
      </div>
    );
  };

  const SingleTabHeader = ({ title, clipboardText }: any) => {
    return (
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
            {title}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            sx={{ py: 0 }}
            onClick={() => {
              navigator.clipboard.writeText(clipboardText);
            }}
          >
            <ContentCopyIcon sx={{ fontSize: '17px', fontWeight: 'bold' }} />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  const SingleTab: any = ({ title, prefix, postfix, handleUpdate, viewOnly, data }: any) => {
    return (
      <Box>
        <SingleTabHeader title={title} clipboardText={`${prefix + JSON.stringify(data) + postfix}`} />
        <Input data={data} prefix={prefix} postfix={postfix} handleEditorUpdate={handleUpdate} viewOnly={viewOnly} />
      </Box>
    );
  };

  let singleTabData = null;
  switch (step) {
    case 'checkout':
      singleTabData = {
        title: 'JS',
        prefix: `
    const checkout = await AdyenCheckout(`,
        postfix: `    );
      
    checkout.create('${profile.product}', {...});`,
        handler: (value: any) => {
          console.log('updating store');
          updateStore(value, updateCheckoutInfo);
        },
        payload: checkout
      };
      break;
    case 'local':
      singleTabData = {
        title: 'JS',
        prefix: `
    const checkout = await AdyenCheckout({...});
                
    checkout.create('${profile.product}',`,
        postfix: `    );`,
        handler: (value: any) => {
          console.log('updating store');
          updateStore(value, updateLocalInfo);
        },
        payload: local
      };
      break;
    case 'sessions':
      singleTabData = {
        title: 'API',
        prefix: `
    Request:`,
        postfix: '',
        handler: (value: any) => {
          console.log('updating store');
          updateStore(value, updateSessionsInfo);
        },
        payload: sessions
      };
      break;
    case 'review':
      multiTabEditor = (
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
            {'STYLE'}
          </TabPanel>
          <TabPanel value={tab} index={3}>
            <StyleEditor />
          </TabPanel>
        </Box>
      );
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
        {singleTabData && (
          <SingleTab
            title={singleTabData.title}
            prefix={singleTabData.prefix}
            postfix={singleTabData.postfix}
            handleUpdate={singleTabData.handler}
            viewOnly={viewOnly}
            data={singleTabData.payload}
          />
        )}
        {multiTabEditor}
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
