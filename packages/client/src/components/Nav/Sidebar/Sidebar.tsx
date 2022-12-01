import { Box, Drawer, List, ListItem, ListItemButton, Typography, Link } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';

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
        {/* <img src="https://docs.adyen.com/api-explorer/img/adyen-api-logo.svg" alt="adyen logo" width="157" height="30" /> */}
        <svg width="170" height="30" enable-background="new 0 0 170 30" viewBox="0 0 170 30" xmlns="http://www.w3.org/2000/svg">
          <rect y="0" x="100" width="60" height="30" rx="8" fill="#E6F8ED"></rect>
          <g fill="#0abf53">
            <path
              d="M12.7406 7.0246H0.200639V11.0374H8.32652C8.82812 11.0374 9.22939 11.4387 9.22939 11.9403V18.9626H7.52396C7.02236 18.9626 6.62109 18.5613 6.62109 18.0597V13.0438H3.21022C1.40447 13.0438 0 14.4482 0 16.254V19.8655C0 21.6712 1.40447 23.0757 3.21022 23.0757H15.9508V10.2348C15.9508 8.42907 14.5463 7.0246 12.7406 7.0246V7.0246Z"
              fill="#0ABF53"
            ></path>
            <path
              d="M27.8888 18.9626H26.1834C25.6818 18.9626 25.2805 18.5613 25.2805 18.0597V7.02459H21.8696C20.0639 7.02459 18.6594 8.42906 18.6594 10.2348V19.7652C18.6594 21.5709 20.0639 22.9754 21.8696 22.9754H34.6102V0.403503H27.9891L27.8888 18.9626Z"
              fill="#0ABF53"
            ></path>
            <path
              d="M46.4479 18.9626H44.7425C44.2409 18.9626 43.8396 18.5613 43.8396 18.0597V7.0246H37.2185V19.7652C37.2185 21.5709 38.623 22.9754 40.4287 22.9754H46.5482V24.9818H37.5195V29.5965H50.0594C51.8652 29.5965 53.2696 28.192 53.2696 26.3863V7.0246H46.6485V18.9626H46.4479Z"
              fill="#0ABF53"
            ></path>
            <path
              d="M68.5182 7.0246H55.7776V19.7652C55.7776 21.5709 57.1821 22.9754 58.9879 22.9754H71.5278V18.9626H63.4019C62.9003 18.9626 62.4991 18.5613 62.4991 18.0597V11.0374H64.2045C64.7061 11.0374 65.1074 11.4387 65.1074 11.9403V16.9562H68.5182C70.324 16.9562 71.7284 15.5518 71.7284 13.746V10.2348C71.7284 8.42907 70.2237 7.0246 68.5182 7.0246V7.0246Z"
              fill="#0ABF53"
            ></path>
            <path
              d="M87.0773 7.0246H74.3367V22.9754H80.9578V11.0374H82.6633C83.1648 11.0374 83.5661 11.4387 83.5661 11.9403V22.9754H90.2875V10.2348C90.2875 8.42907 88.8831 7.0246 87.0773 7.0246V7.0246Z"
              fill="#0ABF53"
            ></path>
          </g>
          <text
            font-weight="bold"
            text-anchor="start"
            font-family="Fakt, Arial, sans-serif"
            font-size="13"
            y="20"
            x="110"
            stroke-width="0"
            fill="#09ae4c"
          >
            SDK
          </text>
        </svg>
      </Box>

      <List>
        <ListItem>
          <Typography variant="h5">Checkout</Typography>
        </ListItem>
        <ListItemButton>
          <Link underline="none" href={'/'}>
            <Typography variant="caption">Overview</Typography>
          </Link>
        </ListItemButton>
        <ListItem>
          <Typography variant="h6">Payments</Typography>
        </ListItem>
        {Object.keys(products).map((product: any, index: number) => (
          <ListItem key={product} disablePadding>
            <ListItemButton>
              <Link underline="none" href={`/${products[product].txvariant}`}>
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
