import InfoIcon from '@mui/icons-material/Info';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, BoxProps, Typography } from '@mui/material';

interface ObjectOptionProps extends BoxProps {
  content: String;
  styleType: 'info' | 'warning' | 'error' | 'success';
}

export const ObjectOption = (props: ObjectOptionProps) => {
  const { content, styleType, ...other } = props;
  const infoStyle = {
    border: '3px solid',
    borderColor: '#cce0ff',
    display: 'flex',
    alignItems: 'center',
    bgcolor: '#cce0ff',
    '#info-icon': { bgcolor: '#cce0ff', px: 1, color: 'primary.main' },
    '#info-text': { display: 'inline-block', px: 1, py: 2, flexGrow: 1, bgcolor: 'primary.light' }
  };
  const warningStyle = {
    border: '3px solid',
    borderColor: 'rgb(255, 234, 204)',
    display: 'flex',
    alignItems: 'center',
    bgcolor: 'rgb(255, 234, 204)',
    '#info-icon': { bgcolor: 'rgb(255, 234, 204)', px: 1, color: 'rgb(255, 149, 0)' },
    '#info-text': { display: 'inline-block', px: 1, py: 2, flexGrow: 1, bgcolor: 'primary.light' }
  };
  const errorStyle = {
    border: '3px solid',
    borderColor: '#ff7e82',
    display: 'flex',
    alignItems: 'center',
    bgcolor: '#ff7e82',
    '#info-icon': { bgcolor: '#ff7e82', px: 1, color: '#d32f2f' },
    '#info-text': { display: 'inline-block', px: 1, py: 2, flexGrow: 1, bgcolor: 'primary.light' }
  };
  const successStyle = {
    border: '3px solid',
    borderColor: '#d4f8d4',
    display: 'flex',
    alignItems: 'center',
    bgcolor: '#d4f8d4',
    '#info-icon': { bgcolor: '#d4f8d4', px: 1, color: '#2ade2a' },
    '#info-text': { display: 'inline-block', px: 1, py: 2, flexGrow: 1, bgcolor: 'primary.light' }
  };

  let notifyStyle = null;
  switch (styleType) {
    case 'info':
      notifyStyle = infoStyle;
      break;
    case 'warning':
      notifyStyle = warningStyle;
      break;
    case 'error':
      notifyStyle = errorStyle;
      break;
    case 'success':
      notifyStyle = successStyle;
      break;
    default:
      notifyStyle = infoStyle;
  }
  return (
    <Box {...other} sx={notifyStyle}>
      <Box component="span" id="info-icon">
        {styleType === 'info' && <InfoIcon />}
        {styleType === 'warning' && <NotificationsNoneIcon />}
        {styleType === 'error' && <ErrorOutlineIcon />}
        {styleType === 'success' && <CheckCircleOutlineIcon />}
      </Box>
      {content && (
        <Typography variant="h6" id="info-text">
          {content}
        </Typography>
      )}
    </Box>
  );
};
