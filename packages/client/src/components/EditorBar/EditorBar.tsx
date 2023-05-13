import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { onDeckActions } from '../../app';
import { useAppDispatch } from '../../hooks';
import type { RootState } from '../../store';
import { NavButtons } from './NavButtons';
import { EditorPrePostFix } from './EditorPrePostFix';
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

export const EditorBar = ({ dimensions, steps }: EditorWrapperProps) => {
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
      <Grid justifyContent="space-between" alignItems="flex-start" sx={{ bgcolor: 'primary.light', px: 4, pt: 1 }} container>
        <Grid item xs={6}>
          <Box
            sx={{
              bgcolor: '#00112C',
              px: 1,
              py: 1,
              display: 'inline-block',
              width: '80px',
              textAlign: 'center',
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '.75rem' }}>
              {title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
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
        <EditorPrePostFix data={data} prefix={prefix} postfix={postfix} handleEditorUpdate={handleUpdate} viewOnly={viewOnly} />
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
            }}
          >
            <Tabs onChange={handleChange} value={tab} centered>
              <Tab
                label={
                  <Typography variant="h6" sx={{ fontSize: '.75rem' }}>
                    js
                  </Typography>
                }
                sx={{ color: '#00112C' }}
              />
              <Tab
                label={
                  <Typography variant="h6" sx={{ fontSize: '.75rem' }}>
                    style
                  </Typography>
                }
                sx={{ color: '#00112C' }}
              />
              <Tab
                label={
                  <Typography variant="h6" sx={{ fontSize: '.75rem' }}>
                    api
                  </Typography>
                }
                sx={{ color: '#00112C' }}
              />
              <Tab
                label={
                  <Typography variant="h6" sx={{ fontSize: '.75rem' }}>
                    state
                  </Typography>
                }
                sx={{ color: '#00112C' }}
              />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0}>
            <EditorPrePostFix
              data={checkout}
              prefix={`const checkout = await AdyenCheckout(`}
              postfix={`);`}
              handleEditorUpdate={(value: any) => {
                console.log(value);
              }}
              viewOnly={true}
            />
            <EditorPrePostFix
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
            <StyleEditor />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <EditorPrePostFix
              data={sessions}
              prefix={`Request:`}
              postfix={''}
              handleEditorUpdate={(value: any) => {
                console.log(value);
              }}
              viewOnly={true}
            />
            <EditorPrePostFix
              data={sessionsResponse}
              prefix={`Response:`}
              postfix={''}
              handleEditorUpdate={(value: any) => {
                console.log(value);
              }}
              viewOnly={true}
            />
          </TabPanel>
          <TabPanel value={tab} index={3}>
            {'STYLE'}
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
          bgcolor: '#00112C',
          color: 'secondary.light',
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
