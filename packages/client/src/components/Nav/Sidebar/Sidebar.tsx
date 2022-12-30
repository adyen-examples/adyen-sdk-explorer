import { Box, Drawer, List, ListItem, ListItemButton, Typography, Link, Grid } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ReactComponent as AdyenLogo } from '../../../assets/adyen-logo.svg';

export const Sidebar = ({ products, page, drawerWidth, headerHeight }: any) => {
  const { updateProfileInfo, updateStep, clearOnDeckInfo } = onDeckActions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const updateStore = (value: any, action: ActionCreatorWithPayload<any>): void => {
    dispatch(action(value));
  };

  const selectedButtonStyle = {
    bgcolor: 'primary.main',
    borderRadius: 1,
    color: '#FFFFFF',
    '&:hover': { bgcolor: 'primary.main' }
  };
  const nonselectedButtonStyle = {
    '&:hover': { bgcolor: 'rgba(0, 102, 255, 0.12)', borderRadius: 1 },
    color: '#000000'
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
        <ListItemButton sx={!page ? selectedButtonStyle : nonselectedButtonStyle}>
          <Link sx={{ width: '100%' }} underline="none" href={'/'}>
            <Typography sx={{ color: `${!page ? 'white' : 'black'}` }} variant="body2">Home</Typography>
          </Link>
        </ListItemButton>
        <ListItem>
          <Typography variant="h5">Online Payments</Typography>
        </ListItem>
        {Object.keys(products).map((product: any, index: number) => {
          let subcategory = null;
          const selected = products[product].txvariant === page;
          const buttonStyle = selected ? selectedButtonStyle : nonselectedButtonStyle;

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
                <ListItemButton sx={buttonStyle}>
                  <Link sx={{ width: '100%' }} underline="none" href={`/${products[product].txvariant}`}>
                    <Typography sx={{ color: `${selected ? 'white' : 'black'}` }} variant="body2">
                      {product}
                    </Typography>
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
