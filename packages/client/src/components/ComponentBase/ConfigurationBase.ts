import { ConfigurationBaseProps } from '../types';

class ConfigurationBase<P extends ConfigurationBaseProps> {
  public props: P;
  public clientKey: string;
  public setError: any;

  public constructor(props: P) {
    this.props = this.formatProps({ ...props });
    this.clientKey = 'test_QFGJGRQZERFWNFYWKEZSQL3E342QEDNU';
    this.setError = props.setState.error;
  }
  protected formatProps(props: P) {
    return props || {};
  }
  get profile() {
    return this.props.profile;
  }
  get product() {
    return this.props.profile.product;
  }
  get global() {
    return this.props.global;
  }
  get local() {
    return this.props.local;
  }
  get data() {
    return this.props.data;
  }
  get queryParameters() {
    return this.props.queryParameters;
  }
}

export default ConfigurationBase;
