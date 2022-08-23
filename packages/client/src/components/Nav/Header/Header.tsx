import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import * as React from 'react';

export const Header = ({ drawerWidth }: any) => {
  return (
    <AppBar elevation={0} position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
      <Box bgcolor="white" sx={{ borderBottom: 1, borderColor: 'primary.border' }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
