import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import * as React from 'react';
import { ReactComponent as AdyenLogo } from '../../../assets/adyen-logo.svg';

export const Header = ({ drawerWidth, headerHeight }: any) => {
  return (
    <AppBar elevation={0} position="fixed" sx={{ width: '100%', maxHeight: `${headerHeight}px` }}>
      <Box bgcolor="white" sx={{ borderBottom: 1, borderColor: 'primary.border', boxShadow: 3, px: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box>
            <AdyenLogo />
          </Box>
          <Box>
            <Button href="https://docs.adyen.com/" sx={{ color: '#394962', ml: 3 }} variant="text">
              Documentation
            </Button>
            <Button href="https://help.adyen.com/en_US" sx={{ color: '#394962', ml: 3 }} variant="text">
              Support
            </Button>
            <Button href="https://www.adyen.com/signup" sx={{ color: '#394962', ml: 3, borderColor: '#bdbdbd' }} variant="outlined">
              Test Account
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
