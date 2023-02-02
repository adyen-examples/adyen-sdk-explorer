import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export type { InitializationRequest, EditableCheckoutConfigFields, CheckoutConfig, PaymentAmount, PaymentMethodsResponseInterface } from './types';

export { useApi } from './useApi';
export { useApiLocal } from './useApiLocal';
export { useCheckout, useInitializeSession } from './checkout';
export { useBuildOnDeck } from './configBuilder/useBuildOnDeck';
export { useRedirect } from './configBuilder/useRedirect';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
