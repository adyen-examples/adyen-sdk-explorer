import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { StyleInputs } from '../StyleInputs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const StyleDrawers = (props: any) => {
  const { sdkClass, style } = props;
  const [open, setToOpen]: any = useState(false);

  const drawerHandler = () => {
    setToOpen(!open);
  };

  return (
    <Box>
      <Box sx={{ border: 1, borderColor: 'divider', bgcolor: 'secondary.gray' }}>
        <Button sx={{ width: '100%', justifyContent: 'space-between', px: 2 }} onClick={drawerHandler}>
          <Typography sx={{ fontSize: '.65rem', color: 'black' }} variant="caption">
            {sdkClass}
          </Typography>
          <Box sx={{ ml: 5, color: 'black' }}>
            {!open && <KeyboardArrowDownIcon sx={{ fontSize: '1rem' }} />}
            {open && <KeyboardArrowUpIcon sx={{ fontSize: '1rem' }} />}
          </Box>
        </Button>
      </Box>
      {open && (
        <Box>
          <StyleInputs style={style[sdkClass]} />
        </Box>
      )}
    </Box>
  );
};
