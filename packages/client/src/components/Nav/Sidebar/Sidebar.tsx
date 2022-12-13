import { Box, Drawer, List, ListItem, ListItemButton, Typography, Link } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ReactComponent as AdyenLogo } from '../../../assets/adyen-logo.svg';

export const Sidebar = ({ products, drawerWidth }: any) => {
  const { updateProfileInfo, updateStep, clearOnDeckInfo } = onDeckActions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };

  return (
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
        <AdyenLogo />
      </Box>

      <List>
        <ListItem>
          <Typography variant="h5">Checkout</Typography>
        </ListItem>
        <ListItemButton>
          <Link sx={{ width: '100%' }} underline="none" href={'/'}>
            <Typography variant="caption">Overview</Typography>
          </Link>
        </ListItemButton>
        <ListItem>
          <Typography variant="h6">Payments</Typography>
        </ListItem>
        {Object.keys(products).map((product: any, index: number) => (
          <ListItem key={product} disablePadding>
            <ListItemButton>
              <Link sx={{ width: '100%' }} underline="none" href={`/${products[product].txvariant}`}>
                <Typography
                  component={'span'}
                  p={0.7}
                  sx={{ bgcolor: '#e6f8ed', borderColor: '#cef2dd', color: '#055f29', borderRadius: '5px' }}
                  variant="caption"
                >
                  SDK
                </Typography>
                <Typography variant="caption">{product}</Typography>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
