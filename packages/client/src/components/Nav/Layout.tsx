import { Box, CssBaseline } from '@mui/material';
import * as React from 'react';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';

export const Layout = ({ children }: any) => {
  const drawerWidth = 380;
  const headerHeight = 64;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} headerHeight={headerHeight} />
      <Box
        position="fixed"
        sx={{ top: '0', bottom: '0', width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, overflow: 'scroll', mt:`${headerHeight}px` }}
        component="main"
      >
        {children}
      </Box>
    </Box>
  );
};
