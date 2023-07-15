import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../../app';
import { useAppDispatch } from '../../../../hooks';

const { resetOnDeckInfo } = onDeckActions;
export interface SingleTabHeaderProps {
  title?: string;
  clipboardText: string;
  txVariant: string;
}
export const SingleTabHeader = (props: SingleTabHeaderProps) => {
  const { title, clipboardText, txVariant } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Grid
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{ bgcolor: 'secondary.light', px: 4, pt: 0.8, boxShadow: '0 8px 8px rgba(0,17,44,.04), 0 2px 4px rgba(0,17,44,.08)' }}
      container
    >
      <Grid item xs={6}>
        <Box
          sx={{
            bgcolor: 'secondary.light',
            px: 1,
            py: 1,
            display: 'inline-block',
            width: '80px',
            textAlign: 'left',
            color: 'secondary.main'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#00112c' }}>
            {title}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ textAlign: 'right' }}>
        <IconButton
          sx={{ py: 0 }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <AutorenewIcon sx={{ fontSize: '17px', fontWeight: 'bold' }} />
        </IconButton>
        <Dialog
          open={open}
          onClick={() => {
            setOpen(false);
          }}
        >
          <DialogContent>
            <Typography variant="h6">Are you sure you want to reset the configuration? All changes will be lost.</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              No
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                dispatch(resetOnDeckInfo());
                navigate(`/${txVariant}`);
              }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <IconButton
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
