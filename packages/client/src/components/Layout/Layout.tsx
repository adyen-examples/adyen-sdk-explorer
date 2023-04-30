import { useEffect, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { useParams } from 'react-router-dom';
import { onDeckActions, sdkExplorerActions } from '../../app';
import { useApiLocal, useAppDispatch } from '../../hooks';
import { EditorWrapper } from '../JSONEditor/Editor';
import { Navbar } from '../Nav/Navbar/Navbar';

const { updateExplorer } = sdkExplorerActions;
const { updateProfileInfo } = onDeckActions;

export const Layout = ({ main: Main }: any) => {
  const [sdkExplorerProps, setSdkExplorerProps] = useState<any>(null);
  console.log('Layout rendered');

  const drawerWidth = 380;
  const headerHeight = 64;
  const navButtonHeight = 40;

  let editorWidth = 0;

  const [products]: any = useApiLocal('http://localhost:8080/api/products', 'GET');
  const { error, data } = products;

  const dispatch = useAppDispatch();

  const pathParams = useParams();
  const product: any = pathParams.component;

  useEffect(() => {
    if (!error && data) {
      let sdkProps: any = null;
      let activeProduct: any = null;
      for (let component in data.products) {
        if (data.products[component].txvariant === product) {
          sdkProps = data.products[component];
        }
      }

      if (sdkProps) {
        activeProduct = { product: sdkProps.txvariant };
      }
      dispatch(updateExplorer(sdkProps));
      dispatch(updateProfileInfo(activeProduct));
      setSdkExplorerProps(sdkProps);
    }
  }, [data, dispatch, error, product]);

  if (!error && data) {
    let editor;

    if (sdkExplorerProps && product) {
      editorWidth = 420;
      editor = (
        <EditorWrapper
          dimensions={{ buttonHeight: navButtonHeight, headerHeight: headerHeight, editorWidth: editorWidth }}
          steps={sdkExplorerProps.steps}
        />
      );
    }
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar drawerWidth={drawerWidth} products={data.products} headerHeight={headerHeight} page={product} />
        <Box
          sx={{
            position: 'fixed',
            top: '0',
            bottom: '0',
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

  if (!sdkExplorerProps && product) {
    return <h1>404: Page not found</h1>;
  }

  return <Box>...Loading</Box>;
};
