import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export type { InitializationRequest, EditableCheckoutConfigFields, CheckoutConfig, PaymentAmount, PaymentMethodsResponseInterface } from './types';

export { useCheckout } from './checkout/useCheckout';
export { useInitializeCheckout } from './checkout/useInitializeCheckout';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
