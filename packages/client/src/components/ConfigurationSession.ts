import ConfigurationBase from './ConfigurationBase';
import { ConfigurationSessionProps } from './types';

class ConfigurationSession<P extends ConfigurationSessionProps = any> extends ConfigurationBase<P> {
  constructor(props: P) {
    super(props);
    this.onPaymentCompleted = this.onPaymentCompleted.bind(this);
    this.onError = this.onError.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onAdditionalDetails = this.onAdditionalDetails.bind(this);
  }
  get sessions() {
    return this.props.sessions;
  }
  get session() {
    return {
      id: this.data.id,
      sessionData: this.data.sessionData
    };
  }
  get checkoutConfig(): any {
    return {
      environment: 'test',
      clientKey: this.clientKey,
      session: this.session,
      onPaymentCompleted: this.onPaymentCompleted,
      onError: this.onError,
      onChange: this.onChange,
      onValid: this.onValid,
      onSubmit: this.onSubmit,
      onComplete: this.onComplete,
      onAdditionalDetails: this.onAdditionalDetails,
      paymentMethodsConfiguration: {
        card: {
          ...this.local
        }
      },
      ...this.global
    };
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
  public onSubmit(state: any, element: object): void {
    console.info(state, element);
  }
  public onComplete(state: any, element: object): void {
    console.info(state, element);
  }
  public onAdditionalDetails(state: any, element: object): void {
    console.info(state, element);
  }
}

export default ConfigurationSession;
