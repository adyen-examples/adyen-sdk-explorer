import { Box, Typography, Button, Collapse } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import { API_URL } from '../../../../config';

export const APIDrawer = (props: any) => {
  const { url, request, response, status, ...other } = props;
  const [open, setOpen] = useState(false);
  let path = null;
  let queryParameters = null;

  if (url.indexOf(API_URL) > -1) {
    path = url.split(API_URL);
  } else if (url.indexOf('https://checkoutshopper-test.adyen.com') > -1) {
    let pathAndQueryParameters = url.split('https://checkoutshopper-test.adyen.com');
    const [parsedPath, parsedQueryParameters] = pathAndQueryParameters[pathAndQueryParameters.length - 1].split('?');
    path = parsedPath;
    queryParameters = parsedQueryParameters;
  }

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box {...other}>
      <Box sx={{ borderBottom: 1, borderColor: 'primary.light', bgcolor: '#00112C' }}>
        <Button sx={{ width: '100%', justifyContent: 'space-between', px: 2 }} onClick={handleClick}>
          <Typography sx={{ fontSize: '.7rem', color: 'primary.light' }} variant="caption">
            {path}
          </Typography>
          <Box sx={{ color: 'black' }}>
            {open && <KeyboardArrowDownIcon sx={{ fontSize: '1rem', color: 'secondary.light' }} />}
            {!open && <KeyboardArrowUpIcon sx={{ fontSize: '1rem', color: 'secondary.light' }} />}
          </Box>
        </Button>
        <Collapse orientation="vertical" in={open} timeout={300}>
          <Box pb={3}>
            {request?.method && (
              <Box>
                <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
                  {`METHOD: ${request.method}`}
                </Typography>
              </Box>
            )}
            {status && (
              <Box>
                <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
                  {`STATUS: ${'' + status}`}
                </Typography>
              </Box>
            )}
            {queryParameters && (
              <Box>
                <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light', display: 'block' }} variant="caption">
                  {'QUERY PARAMETERS:'}
                </Typography>
                <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
                  {queryParameters}
                </Typography>
              </Box>
            )}
            {request?.body && (
              <Box>
                <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
                  {`REQUEST: `}
                </Typography>
              </Box>
            )}
            {request?.body && (
              <Box px={2}>
                <Box sx={{ border: 1, borderRadius: 1, borderColor: 'primary.light', px: 1, bgcolor: '#00112C' }}>
                  <EditorPrePostFix
                    data={JSON.parse(request.body)}
                    handleEditorUpdate={(value: any) => {
                      console.log(value);
                    }}
                    viewOnly={true}
                  />
                </Box>
              </Box>
            )}
            <Box>
              <Typography sx={{ fontSize: '.7rem', px: 2, color: 'primary.light' }} variant="caption">
                {`RESPONSE:`}
              </Typography>
            </Box>
            <Box px={2}>
              <Box sx={{ border: 1, borderRadius: 1, borderColor: 'primary.light', px: 1, bgcolor: '#00112C' }}>
                <EditorPrePostFix
                  data={response}
                  handleEditorUpdate={(value: any) => {
                    console.log(value);
                  }}
                  viewOnly={true}
                />
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};
