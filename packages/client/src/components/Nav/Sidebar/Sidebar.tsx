import { Box, Drawer, List, ListItem, ListItemButton, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export const Sidebar = ({ products, drawerWidth }: any) => {
  const { updateProfileInfo, updateStep } = onDeckActions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };

  const handleClick = (path: any, txvariant: any = null) => (e: any) => {
    navigate(`/${path}`);
    if (txvariant) {
      let activeProduct = {
        product: txvariant
      };
      updateStore(activeProduct, updateProfileInfo);
    }

    let resetStep = 0;
    updateStore(resetStep, updateStep);
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
        <img src="https://docs.adyen.com/api-explorer/img/adyen-api-logo.svg" alt="adyen logo" width="157" height="30" />
      </Box>
      <List>
        <ListItem>
          <Typography variant="h5">Checkout</Typography>
        </ListItem>
        <ListItemButton onClick={handleClick('')}>
          <Typography variant="caption">Overview</Typography>
        </ListItemButton>
        <ListItem>
          <Typography variant="h6">Payments</Typography>
        </ListItem>
        {Object.keys(products).map((product: any, index: number) => (
          <ListItem key={product} disablePadding>
            <ListItemButton onClick={handleClick(product, products[product].txvariant)}>
              <Typography
                component={'span'}
                p={0.7}
                sx={{ bgcolor: '#e6f8ed', borderColor: '#cef2dd', color: '#055f29', borderRadius: '5px' }}
                variant="caption"
              >
                SDK
              </Typography>
              <Typography variant="caption">{product}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
