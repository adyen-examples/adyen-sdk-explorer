import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isConfigEmpty } from '../../helpers';
import { useAppDispatch } from '../index';
import { useMemoCompare } from '../helpers/useMemoCompare';
import { onDeckActions } from '../../app';

const { updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateRedirectInfo, updateActiveStep } = onDeckActions;

export const useRedirect = (configuration: any) => {
  const [queryParameters] = useSearchParams();
  const redirectResult = queryParameters.get('redirectResult');
  const encodedConfig: any = localStorage.getItem('configuration');
  const encodedSDKState: any = localStorage.getItem('sdkExplorer');
  const dispatch = useAppDispatch();

  const componentConfig = useMemoCompare(configuration);
  const storedConfig = useMemoCompare(JSON.parse(encodedConfig));
  const storedSdkExplorerState = useMemoCompare(JSON.parse(encodedSDKState));

  useEffect(() => {
    if (redirectResult) {
      const { checkout, local, sessions } = storedConfig;
      const { steps } = storedSdkExplorerState;

      if (isConfigEmpty(componentConfig)) {
        dispatch(updateCheckoutInfo(checkout));
        dispatch(updateLocalInfo(local));
        dispatch(updateSessionsInfo(sessions));
        dispatch(updateRedirectInfo(true));
        dispatch(updateActiveStep(steps.length - 1));
      }
    }
  }, [redirectResult, componentConfig, storedConfig, storedSdkExplorerState, dispatch]);
};
