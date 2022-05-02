import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export type { InitializationRequest, EditableCheckoutConfigFields, CheckoutConfig, PaymentAmount, PaymentMethodsResponseInterface } from './types';

export { useApi } from './useApi';
export { useCheckout, useInitializeCheckout } from './checkout';
export { useBuildOnDeck } from './configBuilder/useBuildOnDeck';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
