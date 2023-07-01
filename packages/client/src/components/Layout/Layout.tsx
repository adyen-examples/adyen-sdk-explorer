import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { onDeckActions } from '../../app';
import { useAppDispatch } from '../../hooks';
import type { RootState } from '../../store';
import { defaultComponentStyle, defaultDropinStyle } from '../EditorBar/Tabs/StyleTab/defaultStyles';
import { LayoutContent } from './LayoutContent';
import { ErrorBoundary } from 'react-error-boundary';
import { NotFound } from '../Error/NotFound';

const { updateTxVariant, updateStyleInfo } = onDeckActions;

export const Layout = ({ main: Main }: any) => {
  const dispatch = useAppDispatch();
  const { products } = useSelector((state: RootState) => state.onDeck);
  const { component } = useParams();
  const productParam: string | undefined = component;
  const isHome = productParam === undefined ? true : false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpty(products) && pathParamInProducts(products, productParam) && !isHome) {
      dispatch(updateTxVariant(productParam as string));

      if (productParam === 'dropin') {
        dispatch(updateStyleInfo(defaultDropinStyle));
      } else {
        dispatch(updateStyleInfo(defaultComponentStyle));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productParam, products, dispatch]);

  const pathParamInProducts = (products: any, productParam: any) => {
    if (productParam === undefined) return false;

    for (let component in products as { [key: string]: { txVariant: String } }) {
      if (products[component].txVariant === productParam) {
        return true;
      }
    }
    return false;
  };

  const isEmpty = (obj: object) => {
    return Object.keys(obj).length === 0;
  };

  if (!isEmpty(products) && !pathParamInProducts(products, productParam) && !isHome) {
    navigate('/error');
  }
  
  return (
    <ErrorBoundary fallback={<NotFound />}>
      <LayoutContent main={Main} selectedProduct={productParam} />
    </ErrorBoundary>
  );
};
