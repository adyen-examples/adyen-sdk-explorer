import { ConfigurationSessionProps } from './types';
import ConfigurationBase from './ConfigurationBase';

class ConfigurationSession<P extends ConfigurationSessionProps = any> extends ConfigurationBase<P> {
  public initEndpoint: string;
  public sessions: any;
// need to update props type to props: P
  constructor(props: any) { 
    const { profile, global, local, sessions, data } = props;
    super(props);
    this.initEndpoint = 'sessions/sessionStart';
    this.sessions = sessions;
    this.setData(data);

    this.onPaymentCompleted = this.onPaymentCompleted.bind(this);
    this.onError = this.onError.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onValid = this.onValid.bind(this);
    this.beforeSubmit = this.beforeSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onAdditionalDetails = this.onAdditionalDetails.bind(this);
  }
  public onPaymentCompleted(result: any, component: object): void {
    console.info(result, component);
  }
  public onError(error: Error, component: object | undefined): void {
    console.error(error.name, error.message, error.stack, component);
  }
  public onChange(state: any, element: object): void {
    console.info(state, element);
  }
  public onValid(state: any, element: object): void {
    console.info(state, element);
  }
  public beforeSubmit(state: any, element: object, actions: any): Promise<void> {
    return new Promise(() => {
      console.info(state, element, actions);
    }).then(() => console.log('end'));
  }
  public onSubmit(state: any, element: object): void {
    console.info(state, element);
  }
  public onComplete(state: any, element: object): void {
    console.info(state, element);
  }
  public onAdditionalDetails(state: any, element: object): void {
    console.info(state, element);
  }
  public setData(data:any){
    this.data = {
      session: {
        id: data.id,
        sessionData: data.sessionData
      }
    }
  }
}

export default ConfigurationSession;
