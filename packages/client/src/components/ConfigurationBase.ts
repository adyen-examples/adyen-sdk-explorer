import { ConfigurationBaseProps } from '../types';

class ConfigurationBase<P extends ConfigurationBaseProps> {
  public _props: P;
  public _state: any;

  public constructor(props: P) {
    this._props = this.formatProps({ ...props });
    this._state = this._props ? this._props : new Object();
  }
  protected formatProps(props: any) {
    return props || {};
  }
  get state(): object {
    return this._state;
  }
  public set state(configuration: any): void {
    this._state = { ...this._state, ...configuration };
  }
}

export default BaseConfiguration;
