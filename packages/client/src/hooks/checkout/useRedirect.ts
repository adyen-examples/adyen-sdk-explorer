import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { onDeckActions, sdkExplorerActions } from '../../app';
import { isConfigEmpty } from '../../helpers';
import { useAppDispatch } from '../index';

const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateRedirectInfo, updateAdyenStateInfo, updateStep } = onDeckActions;
const { updateExplorer } = sdkExplorerActions;

export const useRedirect = (configuration: any) => {
  const [queryParameters] = useSearchParams();
  const redirectResult = queryParameters.get('redirectResult');
  const encodedConfig: any = localStorage.getItem('componentConfig');
  const encodedSDKState: any = localStorage.getItem('sdkExplorer');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (redirectResult) {
      const storedConfig = JSON.parse(encodedConfig);
      const { checkout, local, sessions, style } = storedConfig;
      const storedSdkExplorerState = JSON.parse(encodedSDKState);
      const { steps, step } = storedSdkExplorerState;
      if (isConfigEmpty(configuration)) {
        dispatch(updateCheckoutInfo(checkout));
        dispatch(updateLocalInfo(local));
        dispatch(updateAdyenStateInfo(style));
        dispatch(updateSessionsInfo(sessions));
        dispatch(updateRedirectInfo(true));
        dispatch(updateStep(steps.length - 1));
        dispatch(updateExplorer({ steps, step }));
      }
    }
  }, []);
};
