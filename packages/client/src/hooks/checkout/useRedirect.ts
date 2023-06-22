import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { onDeckActions } from '../../app';
import { isConfigEmpty } from '../../helpers';
import { useAppDispatch } from '../index';

const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateRedirectInfo, updateAdyenStateInfo, updateActiveStep } = onDeckActions;

export const useRedirect = (configuration: any) => {
  const [queryParameters] = useSearchParams();
  const redirectResult = queryParameters.get('redirectResult');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const encodedConfig: any = localStorage.getItem('componentConfig');
    const encodedSDKState: any = localStorage.getItem('sdkExplorer');

    if (redirectResult) {
      const storedConfig = JSON.parse(encodedConfig);
      const { checkout, local, sessions, style } = storedConfig;
      const storedSdkExplorerState = JSON.parse(encodedSDKState);
      const { steps} = storedSdkExplorerState;
      if (isConfigEmpty(configuration)) {
        dispatch(updateCheckoutInfo(checkout));
        dispatch(updateLocalInfo(local));
        dispatch(updateAdyenStateInfo(style));
        dispatch(updateSessionsInfo(sessions));
        dispatch(updateRedirectInfo(true));
        dispatch(updateActiveStep(steps.length - 1));
      }
    }
  }, [redirectResult, configuration, dispatch]);
};