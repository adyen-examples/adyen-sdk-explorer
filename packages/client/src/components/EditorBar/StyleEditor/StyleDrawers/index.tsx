import { Box, Button, Typography, Collapse } from '@mui/material';
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
      <Box sx={{ border: 1, borderColor: 'secondary.light', bgcolor: '#00112C' }}>
        <Button sx={{ width: '100%', justifyContent: 'space-between', px: 2 }} onClick={drawerHandler}>
          <Typography sx={{ fontSize: '.65rem', color: 'secondary.light' }} variant="caption">
            {sdkClass}
          </Typography>
          <Box sx={{ ml: 5, color: 'black' }}>
            {!open && <KeyboardArrowDownIcon sx={{ fontSize: '1rem', color: 'secondary.light' }} />}
            {open && <KeyboardArrowUpIcon sx={{ fontSize: '1rem', color: 'secondary.light' }} />}
          </Box>
        </Button>
      </Box>
      <Collapse orientation="vertical" in={open} timeout={300}>
        <Box sx={{ px: '5%', py: '2%' }}>
          <StyleInputs style={style[sdkClass]} />
        </Box>
      </Collapse>
    </Box>
  );
};
