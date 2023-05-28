import { Box, CssBaseline } from '@mui/material';
import { useParams } from 'react-router-dom';
import { onDeckActions, sdkExplorerActions } from '../../app';
import { useApiLocal, useAppDispatch } from '../../hooks';
import { EditorBar } from '../EditorBar';
import { Navbar } from '../Nav/Navbar/Navbar';
import { useEffect } from 'react';
import { defaultComponentStyle, defaultDropinStyle } from '../EditorBar/Tabs/StyleTab/defaultStyles';

const { updateExplorer } = sdkExplorerActions;
const { updateProfileInfo, updateStyleInfo } = onDeckActions;

export const Layout = ({ main: Main }: any) => {
  const dispatch = useAppDispatch();

  const drawerWidth = 380;
  const headerHeight = 64;
  const navButtonHeight = 40;
  let editorWidth = 0;

  const [products]: any = useApiLocal('http://localhost:8080/api/products', 'GET');
  const { error, data } = products;
  const pathParams = useParams();
  const product: any = pathParams.component;

  let editor = null;
  let sdkExplorerProps: any = null;
  let activeProduct: any = null;

  console.log('layout called')
  useEffect(() => {
    if (sdkExplorerProps) {
      activeProduct = { product: sdkExplorerProps.txvariant };
      dispatch(updateExplorer(sdkExplorerProps));
      dispatch(updateProfileInfo(activeProduct));

      if (product === 'dropin') {
        dispatch(updateStyleInfo(defaultDropinStyle));
      } else {
        dispatch(updateStyleInfo(defaultComponentStyle));
      }
    }
  }, [product, data]);

  if (!error && data) {
    for (let component in data.products) {
      if (data.products[component].txvariant === product) {
        sdkExplorerProps = data.products[component];
      }
    }

    if (sdkExplorerProps) {
      editorWidth = 420;
      editor = (
        <EditorBar
          dimensions={{ buttonHeight: navButtonHeight, headerHeight: headerHeight, editorWidth: editorWidth }}
          steps={sdkExplorerProps.steps}
        />
      );
    } else if (product !== undefined) {
      return <h1>404: Page not found</h1>;
    }
  }

  if (!error && data) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar drawerWidth={drawerWidth} products={data.products} headerHeight={headerHeight} page={product} />
        <Box
          sx={{
            position: 'fixed',
            top: '0',
            bottom: '0',
            width: `calc(100% - ${drawerWidth}px - ${editorWidth}px)`,
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
          <Main txvariant={product} />
        </Box>
        {editor}
      </Box>
    );
  }
  return <Box>...Loading</Box>;
};
