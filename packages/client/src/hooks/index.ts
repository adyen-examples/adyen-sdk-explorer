import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export type { InitializationRequest, EditableCheckoutConfigFields, CheckoutConfig, PaymentAmount, PaymentMethodsResponseInterface } from './types';

export { useCheckout, useInitializeSession, useRedirect } from './checkout';
export { useMemoCompare } from './helpers/useMemoCompare';
export { useScrollToTop } from './helpers/useScrollToTop';
export { useApi } from './useApi';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
