import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useInitializeCheckout } from '../../hooks';
import type { RootState } from '../../store';
import ConfigurationSession from '../ConfigurationSession';
import Component from './Component';
import RedirectComponent from './RedirectComponent';
import { useEffect, useState } from 'react';
import {isEmpty} from '../../helpers'
import {ProfileOnDeckState} from '../../app/types'

const ComponentBase = () => {
  const { profile, global, local, sessions } = useSelector((state: RootState) => state.onDeck);
  const [values, setError] = useState({ error: false, code: '', message: '' });
  const { error, code, message } = values;
  const [queryParameters] = useSearchParams();
  const redirectResult: any = queryParameters.get('redirectResult');
  const [data] = useInitializeCheckout({ payload: sessions, endpoint: 'sessions/sessionStart' });
  let configuration: any = null;

  // you need to check if profile is empty, if so, then throw an error and have it in a seperate component
  // if its not empty then start to initialize the data. 


  // if(error){
  //   return <ErrorComponent error={{error, code, message}} />
  // }else if (redirectResult){
  //   configuration = new ConfigurationSession({ profile, global, local, sessions });
  //   return <RedirectComponent configuration={configuration} redirectResult={redirectResult} />;
  // }else if (data){
  //   configuration = new ConfigurationSession({ profile, global, local, sessions, data });
  //   return <Component configuration={configuration} />;
  // }


  if (data && !isEmpty(profile)) {
    configuration = new ConfigurationSession({ profile, global, local, sessions, data });
    if (redirectResult) {
      return <RedirectComponent configuration={configuration} redirectResult={redirectResult} />;
    }
    return <Component configuration={configuration} />;
  }
  return <div>Loading...</div>;
};

export default ComponentBase;
