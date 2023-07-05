import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { onDeckActions } from '../../app';
import { isConfigEmpty } from '../../helpers';
import { useAppDispatch } from '../index';

const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateRedirectInfo, updateActiveStep, updateStyleInfo } = onDeckActions;

export const useRedirect = (currConfiguration: any) => {
  const [queryParameters] = useSearchParams();
  const redirectResult = queryParameters.get('redirectResult');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const encodedConfig: any = localStorage.getItem('componentConfig');
    const storedConfig = encodedConfig ? JSON.parse(encodedConfig) : null;
    const encodedSDKState: any = localStorage.getItem('sdkExplorer');
    const storedSdkExplorerState = encodedSDKState ? JSON.parse(encodedSDKState) : null;

    if (redirectResult && isConfigEmpty(currConfiguration) && !isConfigEmpty(storedConfig)) {
      const { steps } = storedSdkExplorerState;
      dispatch(updateCheckoutInfo(storedConfig.checkout));
      dispatch(updateLocalInfo(storedConfig.local));
      dispatch(updateSessionsInfo(storedConfig.sessions));
      dispatch(updateRedirectInfo(true));
      dispatch(updateActiveStep(steps.length - 1));
      dispatch(updateStyleInfo(storedConfig.style));
    }
  }, [dispatch, currConfiguration, redirectResult]);
};
