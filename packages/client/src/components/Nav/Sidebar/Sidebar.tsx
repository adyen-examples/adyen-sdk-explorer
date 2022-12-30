import { Box, Drawer, List, ListItem, ListItemButton, Typography, Link, Grid } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ReactComponent as AdyenLogo } from '../../../assets/adyen-logo.svg';

export const Sidebar = ({ products, drawerWidth, headerHeight }: any) => {
  const { updateProfileInfo, updateStep, clearOnDeckInfo } = onDeckActions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          mt: `calc(${headerHeight}px + 5px)`,
          height: `calc(100% - ${headerHeight}px)`,
          pt: 2,
          px: 3
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItemButton sx={{ '&:hover': { bgcolor: 'rgba(0, 102, 255, 0.12)' } }}>
          <Link sx={{ width: '100%' }} underline="none" href={'/'}>
            <Typography variant="caption">Home</Typography>
          </Link>
        </ListItemButton>
        <ListItem>
          <Typography variant="h5">Online Payments</Typography>
        </ListItem>
        {Object.keys(products).map((product: any, index: number) => {
          let subcategory = null;

          if (product === 'Drop-in') {
            subcategory = (
              <ListItem>
                <Typography variant="h5">Components</Typography>
              </ListItem>
            );
          }
          return (
            <Box>
              <ListItem key={product} disablePadding>
                <ListItemButton sx={{ '&:hover': { bgcolor: 'rgba(0, 102, 255, 0.12)' } }}>
                  <Link sx={{ width: '100%' }} underline="none" href={`/${products[product].txvariant}`}>
                    <Typography variant="caption">{product}</Typography>
                  </Link>
                </ListItemButton>
              </ListItem>
              {subcategory}
            </Box>
          );
        })}
      </List>
    </Drawer>
  );
};
