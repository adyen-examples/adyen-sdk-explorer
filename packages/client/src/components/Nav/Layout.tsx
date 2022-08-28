import { Box, CssBaseline } from '@mui/material';
import * as React from 'react';
import { Header } from './Header/Header';
import { JSONEditor } from './JSONEditor/JSONEditor';
import { Sidebar } from './Sidebar/Sidebar';

export const Layout = ({ children }: any) => {
  const drawerWidth = 380;
  const headerHeight = 64;
  const editorWidth = 420;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} headerHeight={headerHeight}/>
      <Box
        sx={{
          position: 'fixed',
          top: '0',
          bottom: '0',
          width: `calc(100% - ${drawerWidth}px - ${editorWidth}px)`,
          ml: `${drawerWidth}px`,
          mr: `${editorWidth}px`,
          overflow: 'scroll',
          mt: `${headerHeight}px`
        }}
        component="main"
      >
        {children}
      </Box>
      <JSONEditor headerHeight={headerHeight} editorWidth={editorWidth}/>
    </Box>
  );
};
