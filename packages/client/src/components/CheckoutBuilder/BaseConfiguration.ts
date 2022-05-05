import { Session } from 'inspector';
import { BaseConfigurationProps } from '../types';
import SessionConfiguration from './SessionConfiguration';

class BaseConfiguration<P extends BaseConfigurationProps> {
  private _props: P;
  protected _state: any;

  public constructor(props: any = {}) {
    this._props = this.formatProps({ ...props });
    this._state = this._props ? this._props : new Object();
  }
  protected formatProps(props: any) {
    return props || {};
  }
  private get props(): object {
    return this._props;
  }
  private set props(configuration: any) {
    this._props = this.formatProps({ ...this._props, ...configuration });
  }
  public get state(): object {
    return this._state;
  }
  public set state(configuration: any) {
    this._state = { ...this._state, ...configuration };
  }

  public toggleConfigOption(configOptionType: any, configOptionKey: any) {
    if (this._state[configOptionType].hasOwnProperty(configOptionKey)) {
      delete this._state[configOptionType][configOptionKey];
    } else {
      this._state[configOptionType][configOptionKey] = '';
    }
  }

  public setConfigOption(configOption: string, configOptionKey: string, configOptionValue: string) {
    this._state[configOption][configOptionKey] = configOptionValue;
  }

  public getConfigOption(configOption: string) : object {
      return this._state[configOption];
  }

  public toSessionConfiguration(): SessionConfiguration {
    const test = new SessionConfiguration(this._props,this._state);
    return test;
  }
}

export default BaseConfiguration;
