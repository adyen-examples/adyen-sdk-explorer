import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import * as React from 'react';

export const Header = ({ drawerWidth, headerHeight }: any) => {
  return (
    <AppBar elevation={0} position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, maxHeight: `${headerHeight}px` }}>
      <Box bgcolor="white" sx={{ borderBottom: 1, borderColor: 'primary.border' }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Button href="https://docs.adyen.com/" sx={{ color: '#394962', ml: 3 }} variant="text">
            Documentation
          </Button>
          <Button href="https://help.adyen.com/en_US" sx={{ color: '#394962', ml: 3 }} variant="text">
            Support
          </Button>
          <Button href="https://www.adyen.com/signup" sx={{ color: '#394962', ml: 3, borderColor: '#bdbdbd' }} variant="outlined">
            Test Account
          </Button>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
