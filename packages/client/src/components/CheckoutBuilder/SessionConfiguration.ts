import { SessionConfigurationProps, BaseConfigurationProps, AdyenConfiguration } from '../types';
import BaseConfiguration from './BaseConfiguration';

class SessionConfiguration<P extends SessionConfigurationProps = any> extends BaseConfiguration<P> implements AdyenConfiguration {
  constructor(props: P) {
    super(props);
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

  public get globalConfigOptions(): object {
    return this._state.globalConfigOptions;
  }

  public get localConfigOptions(): object {
    return this._state.localConfigOptions;
  }

  public get sessionsRequestOptions(): object {
    return this._state.sessions;
  }

  public get session(): {id:string, data: string} {
    return this.session;
  }

  public set session(session: {id:string, data: string}){
    this.session = session;
  }
}

export default SessionConfiguration;
