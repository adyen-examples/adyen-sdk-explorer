import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import * as React from 'react';

const drawerWidth = 380;

export const Nav = ({ children }: any) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'secondary.gray'
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Box pl={2} pt={2}>
          <img src="https://docs.adyen.com/api-explorer/img/adyen-api-logo.svg" alt="adyen logo" width="157" height="30" />
        </Box>
        <List>
          <ListItem>
            <Typography variant="h5">Checkout</Typography>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Typography variant="caption">Overview</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <Typography variant="h6">Payments</Typography>
          </ListItem>
          {['Dropin', 'Cards', 'Paysafecard'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <Typography
                  component={'span'}
                  p={0.7}
                  sx={{ bgcolor: '#e6f8ed', borderColor: '#cef2dd', color: '#055f29', borderRadius: '5px' }}
                  variant="caption"
                >
                  SDK
                </Typography>
                <Typography variant="caption">{text}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main">{children}</Box>
    </Box>
  );
};
