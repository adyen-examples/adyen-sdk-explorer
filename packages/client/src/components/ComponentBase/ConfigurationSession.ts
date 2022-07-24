import { ConfigurationSessionProps } from '../types';
import ConfigurationBase from './ConfigurationBase';

class ConfigurationSession<P extends ConfigurationSessionProps = any> extends ConfigurationBase<P> {
  constructor(props: any) {
    super(props);
    this.onPaymentCompleted = this.onPaymentCompleted.bind(this);
    this.onError = this.onError.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onValid = this.onValid.bind(this);
  }
  get sessions() {
    return this.props.sessions;
  }
  get session() {
    if (this.queryParameters && this.queryParameters.sessionId) {
      return {
        id: this.queryParameters.sessionId
      };
    }
    return {
      id: this.data.id,
      sessionData: this.data.sessionData
    };
  }
  get redirectResult() {
    return {
      details: { redirectResult: this.queryParameters.redirectResult }
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
      paymentMethodsConfiguration: {
        card: {
          ...this.local
        }
      },
      ...this.global
    };
  }

  public onPaymentCompleted(result: any, component: any): void {
    console.log('Payment Completed');
    console.info(result, component);
    alert('On payment completed');
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
}

export default ConfigurationSession;
