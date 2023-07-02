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
  const navButtonHeight = 40;
  const isHome = selectedProduct ? false : true;
  const editorWidth = isHome ? 0 : 420;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar drawerWidth={drawerWidth} headerHeight={headerHeight} page={selectedProduct} />
      <Box
        id="main-content"
        sx={{
          position: 'fixed',
          top: '0',
          bottom: '0',
          width: `calc(100% - ${drawerWidth}px - ${editorWidth}px)`,
          maxWidth: `calc(100% - ${drawerWidth}px - ${editorWidth}px)`,
          ml: {
            xs: 0,
            md: 0,
            lg: `${drawerWidth}px`,
            xl: `${drawerWidth}px`
          },
          mr: {
            xs: 0,
            md: `${editorWidth}px`,
            lg: `${editorWidth}px`,
            xl: `${editorWidth}px`
          },
          overflow: 'scroll',
          mt: `${headerHeight}px`
        }}
        component="main"
      >
        <Main txvariant={selectedProduct} />
      </Box>
      {!isHome && (
        <EditorBar
          dimensions={{ buttonHeight: navButtonHeight, headerHeight: headerHeight, editorWidth: editorWidth }}
          steps={['sessions', 'checkout', 'local', 'review']}
        />
      )}
    </Box>
  );
};
