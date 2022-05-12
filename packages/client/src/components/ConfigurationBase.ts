import { ConfigurationBaseProps } from '../types';

class ConfigurationBase<P extends ConfigurationBaseProps> {
  public props: P;
  public data: any;
  public state: any;

  public constructor(props: P) {
    this.props = this.formatProps({ ...props });
    this.state = this.props ? this.props : new Object();
  }
  protected formatProps(props: any) {
    return props || {};
  }
  get state(): object {
    return this.state;
  }
  set state(configuration: any): void {
    this.state = { ...this.state, ...configuration };
  }
  set data(payload: any): void {
    this.data = { payload };
  }
}

export default ConfigurationBase;
