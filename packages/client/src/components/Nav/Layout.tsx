import { Box, CssBaseline } from '@mui/material';
import * as React from 'react';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

export const Layout = ({ children }: any) => {
  const drawerWidth = 380;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <Box component="main">
        {children}
      </Box>
    </Box>
  );
};
