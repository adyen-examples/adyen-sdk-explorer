import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { onDeckActions } from '../../app';
import { isConfigEmpty } from '../../helpers';
import { useAppDispatch } from '../index';

const { updateProfileInfo, updateCheckoutInfo, updateLocalInfo, updateSessionsInfo, updateRedirectInfo } = onDeckActions;

export const useRedirect = (globalStateConfig: any, setStep: any) => {
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult');
  const encodedConfig: any = localStorage.getItem('configuration');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (redirectResult) {
      const storedConfig = JSON.parse(encodedConfig);
      const { profile, checkout, local, sessions } = storedConfig;

      if (isConfigEmpty(globalStateConfig)) {
        dispatch(updateProfileInfo(profile));
        dispatch(updateCheckoutInfo(checkout));
        dispatch(updateLocalInfo(local));
        dispatch(updateSessionsInfo(sessions));
        dispatch(updateRedirectInfo(true));
        setStep(4);
      }
    }
  }, []);
};
