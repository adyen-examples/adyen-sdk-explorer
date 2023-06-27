import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Button, Collapse, Typography } from '@mui/material';
import { useState } from 'react';
import { StyleInputs } from '../StyleInputs';

export const StyleDrawers = (props: any) => {
  const { sdkClass, myStyle } = props;
  const [open, setToOpen]: any = useState(false);

  const drawerHandler = () => {
    setToOpen(!open);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: '#00112C', bgcolor: 'secondary.light' }}>
        <Button sx={{ width: '100%', justifyContent: 'space-between', px: 2 }} onClick={drawerHandler}>
          <Typography sx={{ fontSize: '.65rem', color: '#00112C' }} variant="caption">
            {sdkClass}
          </Typography>
          <Box sx={{ ml: 5, color: 'black' }}>
            {!open && <KeyboardArrowDownIcon sx={{ fontSize: '1rem', color: '#00112C' }} />}
            {open && <KeyboardArrowUpIcon sx={{ fontSize: '1rem', color: '#00112C' }} />}
          </Box>
        </Button>
      </Box>
      <Collapse orientation="vertical" in={open} timeout={300}>
        <Box sx={{ px: '5%', py: '2%' }}>
          <StyleInputs targetClass={sdkClass} style={myStyle[sdkClass]} />
        </Box>
      </Collapse>
    </Box>
  );
};
