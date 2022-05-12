import { ConfigurationBaseProps } from './types';

class ConfigurationBase<P extends ConfigurationBaseProps> {
  public props: P;
  public product: string;
  public data: any;
  public constructor(props: P) {
    this.props = this.formatProps({ ...props });
    this.product = this.props.profile.product;
  }
  protected formatProps(props: any) {
    return props || {};
  }
}

export default ConfigurationBase;
