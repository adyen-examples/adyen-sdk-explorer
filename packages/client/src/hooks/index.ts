import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useCheckout } from './checkout/useCheckout';
import { useInitializeCheckout } from './checkout/useInitializeCheckout';
import type { RootState, AppDispatch } from '../store';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useCheckout, useInitializeCheckout, useAppDispatch, useAppSelector };
