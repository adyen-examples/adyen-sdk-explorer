import {BaseConfigurationProps, Configurations} from '../types';

class BaseConfiguration <P extends BaseConfigurationProps>{
    public props: P;
    public state;

    protected constructor(props: P){
        this.props = this.formatProps({...props});
        this.state = {};
    }
    protected formatProps(props: P) {
        return props;
    }
    //we are going to create a set and get configuration
    //this should work regardless of solution
    //we only need name and library information from props
    // after that we will create the configuration based off of that information
    // we can create a callback functions in a sessionsCOnfiguration that extends base configuration
    // it will inherit all of this, but will be pre-supplied with the call backs
    // Then I will send that mikes component base
    // And we can create just a json for a dictionary that we have on deck
    // This will clean up the code, allow us to create new configurations regardless of solution
    // that will extend this base
    // so we really just need the get and set
    set configuration(type: Configurations, value: string): any {
        this.state[type] = new Object;
        if(this.state[type])
    }
}

export default BaseConfiguration;