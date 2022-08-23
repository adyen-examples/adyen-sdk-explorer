import { Box, Drawer, List, ListItem, ListItemButton, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';

export const Sidebar = ({drawerWidth}: any) => {
  const { updateProfileInfo } = onDeckActions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (product: any) => (e: any) => {
 
    const value: any = { product: product };
    dispatch(updateProfileInfo(value));
    // I still need to clear the state and set a param for the step at the global state level
    // I also want to replicate a fake api call that provides the payment methods
    navigate(`/${product}`);
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
        <ListItem>
          <ListItemButton>
            <Typography variant="caption">Overview</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <Typography variant="h6">Payments</Typography>
        </ListItem>
        {[
          'dropin',
          'cards',
          'ACH Direct Debit',
          'Affirm',
          'Afterpay',
          'Alipay',
          'Amazon Pay',
          'Apple Pay',
          'paysafecard',
          'dropin',
          'cards',
          'ACH Direct Debit',
          'Affirm',
          'Afterpay',
          'Alipay',
          'Amazon Pay',
          'Apple Pay',
          'paysafecard'
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleClick(text)}>
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
  );
};
