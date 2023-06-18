import { CLIENT_KEY } from '../../config';
import { ConfigurationBaseProps } from '../types';

export class ConfigurationBase<P extends ConfigurationBaseProps> {
  public props: P;
  public clientKey: string;

  public constructor(props: P) {
    this.props = this.formatProps({ ...props });
    this.clientKey = CLIENT_KEY;
  }
  protected formatProps(props: P) {
    return props || {};
  }
  get product() {
    return this.props.txVariant;
  }
  get global() {
    return this.props.checkout;
  }
  get local() {
    return { ...this.props.local, onChange: this.props.setState.adyenState };
  }
  get data() {
    return this.props.data;
  }
  get queryParameters() {
    return this.props.queryParameters;
  }
  get setError() {
    return this.props.setState.error;
  }
  get setResult() {
    return this.props.setState.result;
  }
  get setAdyenState() {
    return this.props.setState.adyenState;
  }
}
