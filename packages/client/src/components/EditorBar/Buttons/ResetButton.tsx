import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box, BoxProps, Button, Dialog, DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
interface ResetButtonProps extends BoxProps {
  steps: any;
  step: number;
  configuration: any;
}

export const ResetButton = (props: ResetButtonProps) => {
  const { steps, step, configuration, ...other } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { resetOnDeckInfo } = onDeckActions;
  const [open, setOpen] = useState(false);

  return (
    <Box {...other}>
      <IconButton
        id="reset-button"
        onClick={() => {
          setOpen(true);
        }}
      >
        <AutorenewIcon id="reset-button-icon" />
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
              navigate(`/${configuration.txVariant}`);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
