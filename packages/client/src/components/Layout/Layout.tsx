import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { onDeckActions } from '../../app';
import { useApi, useAppDispatch } from '../../hooks';
import { defaultComponentStyle, defaultDropinStyle } from '../EditorBar/Tabs/StyleTab/defaultStyles';
import { LayoutContent } from './LayoutContent';

const { updateTxVariant, updateStyleInfo } = onDeckActions;

export const Layout = ({ main: Main }: any) => {
  const dispatch = useAppDispatch();
  const { data, error } = useApi('api/checkout/paymentMethods', 'GET');
  const pathParams = useParams();
  const product: string | undefined = pathParams.component;
  const isHome = product === undefined ? true : false;
  let sdkExplorerProps: any = null;

  useEffect(() => {
    if (sdkExplorerProps) {
      dispatch(updateTxVariant(sdkExplorerProps.txVariant));

      if (product === 'dropin') {
        dispatch(updateStyleInfo(defaultDropinStyle));
      } else {
        dispatch(updateStyleInfo(defaultComponentStyle));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, data, dispatch]);

  if (!error && data) {
    for (let component in data as { [key: string]: { txvariant: String } }) {
      if (data[component].txVariant === product) {
        let componentDescriptors: object = data[component];
        sdkExplorerProps = componentDescriptors ? { ...componentDescriptors } : null;
      }
    }

    if (sdkExplorerProps || isHome) {
      return <LayoutContent main={Main} selectedProduct={product} products={data} />;
    } else {
      return <h1>404: Page not found</h1>;
    }
  }

  return null;
};
