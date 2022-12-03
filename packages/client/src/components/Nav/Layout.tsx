import { Box, CssBaseline } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from './Header/Header';
import { JSONEditor } from './JSONEditor/JSONEditor';
import { Sidebar } from './Sidebar/Sidebar';
import { useApiLocal, useRedirect } from '../../hooks';
import { sdkExplorerActions, onDeckActions } from '../../app';
import { useAppDispatch } from '../../hooks';
import type { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const { updateExplorer } = sdkExplorerActions;
const { updateProfileInfo } = onDeckActions;

export const Layout = ({ main: Main }: any) => {
  const drawerWidth = 380;
  const headerHeight = 64;
  const editorWidth = 420;

  const [products]: any = useApiLocal('http://localhost:8080/api/products', 'GET');
  const { state, error, data } = products;

  const dispatch = useAppDispatch();

  const pathParams = useParams();
  const product: any = pathParams.component;

  let editor = null;

  if (!error && data) {
    // Here we only have the path parameter which is not the tx variant
    // And we need to pass the tx variant.
    // We'll have to search each txvariant until there is a match

    let sdkExplorerProps: any = null;
    Object.keys(data.products).forEach(component => {
      if (data.products[component].txvariant === product) {
        sdkExplorerProps = data.products[component];
      }
    });
    console.log('sdkExplorerProps', sdkExplorerProps);

    if (sdkExplorerProps) {
      const txvariant = sdkExplorerProps.txvariant;
      const activeProduct: any = {
        product: txvariant
      };
      console.log('activeProduct', activeProduct);

      dispatch(updateExplorer(sdkExplorerProps));
      dispatch(updateProfileInfo(activeProduct));
      editor = <JSONEditor headerHeight={headerHeight} editorWidth={editorWidth} />;
    } else {
      return <h1>404: Page not found</h1>;
    }

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header drawerWidth={drawerWidth} />
        <Sidebar drawerWidth={drawerWidth} products={data.products} />
        <Box
          sx={{
            position: 'fixed',
            top: '0',
            bottom: '0',
            width: `calc(100% - ${drawerWidth}px - ${editorWidth}px)`,
            ml: `${drawerWidth}px`,
            mr: `${editorWidth}px`,
            overflow: 'scroll',
            mt: `${headerHeight}px`
          }}
          component="main"
        >
          <Main key={product} />
          {editor}
        </Box>
      </Box>
    );
  }

  return <Box>...Loading</Box>;
};
