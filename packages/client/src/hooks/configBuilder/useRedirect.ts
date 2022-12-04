import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { onDeckActions } from '../../app';
import { isConfigEmpty } from '../../helpers';
import { useAppDispatch } from '../index';
import { sdkExplorerActions } from '../../app';

const { updateProfileInfo, updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateRedirectInfo, updateStep } = onDeckActions;
const { updateExplorer } = sdkExplorerActions;

export const useRedirect = (configuration: any) => {
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult');
  const encodedConfig: any = localStorage.getItem('configuration');
  const encodedSDKState: any = localStorage.getItem('sdkExplorer');
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (redirectResult) {
      const storedConfig = JSON.parse(encodedConfig);
      const { checkout, local, sessions } = storedConfig;
      const storedSdkExplorerState = JSON.parse(encodedSDKState);
      const {steps, step} = storedSdkExplorerState;

      if (isConfigEmpty(configuration)) {
        dispatch(updateCheckoutInfo(checkout));
        dispatch(updateLocalInfo(local));
        dispatch(updateSessionsInfo(sessions));
        dispatch(updateRedirectInfo(true));
        dispatch(updateStep(steps.length - 1));
        dispatch(updateExplorer({steps, step}));
      }
    }
  }, []);
};
