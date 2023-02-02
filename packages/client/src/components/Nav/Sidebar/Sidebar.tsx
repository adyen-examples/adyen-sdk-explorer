import { Box, Drawer, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { onDeckActions } from '../../../app';
import { useAppDispatch } from '../../../hooks';

export const Sidebar = ({ products, page, drawerWidth, headerHeight }: any) => {
  const { clearOnDeckInfo } = onDeckActions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleClick = (txvariant: any) => {
    navigate(`/${txvariant}`);
    dispatch(clearOnDeckInfo());
  };
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          borderRight: 2,
          borderColor: 'secondary.light',
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
        <ListItemButton onClick={(e: any) => handleClick('')} sx={!page ? selectedButtonStyle : nonselectedButtonStyle}>
          <Typography sx={{ color: `${!page ? 'white' : 'black'}` }} variant="h6">
            Home
          </Typography>
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
            <Box key={product}>
              <ListItem disablePadding>
                <ListItemButton sx={buttonStyle} onClick={(e: any) => handleClick(products[product].txvariant)}>
                  <Typography sx={{ color: `${selected ? 'white' : 'black'}` }} variant="h6">
                    {product}
                  </Typography>
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
