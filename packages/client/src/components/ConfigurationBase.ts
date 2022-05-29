import { ConfigurationBaseProps } from './types';
//P extends ConfigurationBaseProps
class ConfigurationBase<P extends ConfigurationBaseProps> {
  public props: P;
  public data: any;
  public global: any;
  public local: any;
  public profile: any;

  public constructor(props: P) {
    this.props = this.formatProps({ ...props });
    this.profile = this.props.profile;
    this.global = this.props.global;
    this.local = this.props.local;
  }
  protected formatProps(props: any) {
    return props || {};
  }

  protected setData(res: any) {
    this.data = res;
  }
}

export default ConfigurationBase;
