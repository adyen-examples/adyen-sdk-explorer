import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../index';
import { onDeckActions } from '../../app';
import { isConfigEmpty, deepEqual } from '../../helpers';

const { updateProfileInfo, updateCheckoutInfo, updateLocalInfo, updateSessionsInfo } = onDeckActions;

export const useRedirect = (globalStateConfig: any, setStep: any) => {
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult');
  const encodedConfig: any = localStorage.getItem("configuration");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (redirectResult) {      
      const storedConfig = JSON.parse(encodedConfig);
      const { profile, checkout, local, sessions } = storedConfig;

      if(isConfigEmpty(globalStateConfig)){
        dispatch(updateProfileInfo(profile));
        dispatch(updateCheckoutInfo(checkout));
        dispatch(updateLocalInfo(local));
        dispatch(updateSessionsInfo(sessions));
        setStep(4);
      } 
    }
  }, []);
};
