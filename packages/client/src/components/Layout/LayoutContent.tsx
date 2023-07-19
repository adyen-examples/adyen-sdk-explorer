import { Box, CssBaseline } from '@mui/material';
import { EditorBar } from '../EditorBar';
import { Navbar } from '../Nav/Navbar/Navbar';

interface LayoutContentProps {
  main: any;
  selectedProduct: string | undefined;
}

export const LayoutContent = ({ main: Main, selectedProduct }: LayoutContentProps) => {
  const drawerWidth = 380;
  const headerHeight = 64;
  const navButtonHeight = 60;
  const isHome = selectedProduct ? false : true;
  const editorWidth = isHome ? 0 : 420;

  const style = {
    position: 'fixed',
    top: '0',
    bottom: '0',
    width: {
      xs: '100%',
      sm: '100%',
      md: `calc(100% - ${drawerWidth}px)`,
      lg: `calc(100% - ${drawerWidth}px - ${editorWidth}px)`,
      xl: `calc(100% - ${drawerWidth}px - ${editorWidth}px)`
    },
    maxWidth: {
      xs: '100%',
      md: `calc(100% - ${drawerWidth}px)`,
      lg: `calc(100% - ${drawerWidth}px - ${editorWidth}px)`,
      xl: `calc(100% - ${drawerWidth}px - ${editorWidth}px)`
    },
    ml: {
      xs: 0,
      md: 0,
      lg: `${drawerWidth}px`,
      xl: `${drawerWidth}px`
    },
    mr: {
      xs: 0,
      md: 0,
      lg: `${editorWidth}px`,
      xl: `${editorWidth}px`
    },
    overflow: 'scroll',
    mt: `${headerHeight}px`
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar drawerWidth={drawerWidth} headerHeight={headerHeight} page={selectedProduct} />
      <Box id="main-content" sx={style} component="main">
        <Main txvariant={selectedProduct} />
      </Box>
      {!isHome && <EditorBar dimensions={{ buttonHeight: navButtonHeight, headerHeight: headerHeight, editorWidth: editorWidth }} />}
    </Box>
  );
};
