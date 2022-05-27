import { ConfigurationBaseProps } from './types';
//P extends ConfigurationBaseProps
class ConfigurationBase<P extends ConfigurationBaseProps> {
  public props: P;
  public product: string;
  public data: any;
  public global: any;
  public local: any;

  public constructor(props: P) {
    this.props = this.formatProps({ ...props });
    this.product = this.props.profile.product;
    this.global = this.props.global;
    this.local = this.props.local;
  }
  protected formatProps(props: any) {
    return props || {};
  }

  protected setData(props: any) {
    return props || {};
  }
}

export default ConfigurationBase;
