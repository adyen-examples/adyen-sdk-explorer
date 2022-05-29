import { ConfigurationSessionProps } from './types';
import ConfigurationBase from './ConfigurationBase';

class ConfigurationSession<P extends ConfigurationSessionProps = any> extends ConfigurationBase<P> {
  public initEndpoint: string;
  public sessions: any;
  public session: any;
  public clientKey: any;
// need to update props type to props: P
  constructor(props: any) { 
    const { profile, global, local, sessions, data } = props;
    super(props);
    this.initEndpoint = 'sessions/sessionStart';
    this.sessions = sessions;
    this.setSession(data);

    this.onPaymentCompleted = this.onPaymentCompleted.bind(this);
    this.onError = this.onError.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onValid = this.onValid.bind(this);
    this.beforeSubmit = this.beforeSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onAdditionalDetails = this.onAdditionalDetails.bind(this);
    this.clientKey = 'test_QFGJGRQZERFWNFYWKEZSQL3E342QEDNU';
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
  public setSession(data:any){
    this.session = {
        id: data.id,
        sessionData: data.sessionData
      }
  }
  get CheckoutConfig(): any{
    return {
      environment: 'test',
      clientKey: this.clientKey,
      session: this.session,
      onPaymentCompleted: this.onPaymentCompleted,
      ...this.global
    }
  }
}

export default ConfigurationSession;
