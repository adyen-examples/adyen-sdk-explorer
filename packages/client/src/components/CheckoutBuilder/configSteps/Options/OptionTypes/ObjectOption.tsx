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
    borderColor: 'alert.info',
    display: 'flex',
    alignItems: 'center',
    bgcolor: 'alert.info',
    '#info-icon': { bgcolor: 'alert.info', px: 1, color: 'primary.main' },
    '#info-text': { display: 'inline-block', px: 1, py: 2, flexGrow: 1, bgcolor: 'background.default' }
  };
  const warningStyle = {
    border: '3px solid',
    borderColor: 'alert.warning',
    display: 'flex',
    alignItems: 'center',
    bgcolor: 'alert.warning',
    '#info-icon': { bgcolor: 'alert.warning', px: 1, color: 'warning.main' },
    '#info-text': { display: 'inline-block', px: 1, py: 2, flexGrow: 1, bgcolor: 'background.default' }
  };
  const errorStyle = {
    border: '3px solid',
    borderColor: 'alert.error',
    display: 'flex',
    alignItems: 'center',
    bgcolor: 'alert.error',
    '#info-icon': { bgcolor: 'alert.error', px: 1, color: 'error.main' },
    '#info-text': { display: 'inline-block', px: 1, py: 2, flexGrow: 1, bgcolor: 'background.default' }
  };
  const successStyle = {
    border: '3px solid',
    borderColor: 'alert.success',
    display: 'flex',
    alignItems: 'center',
    bgcolor: 'alert.success',
    '#info-icon': { bgcolor: 'alert.success', px: 1, color: 'success.light' },
    '#info-text': { display: 'inline-block', px: 1, py: 2, flexGrow: 1, bgcolor: 'background.default' }
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
