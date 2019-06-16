import React from 'react';
import { get_config, write_config } from '../../controller/monitor/file';

const globalContext = React.createContext();

export default class GlobalContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
    };
  }

  componentWillMount = () => {
    get_config(res => {
      this.setState({ config: res });
    });
  };

  change_state = (option, name, data) => {
    let _new_config = this.state.config;
    _new_config[option][name] = data;
    this.setState({ config: _new_config }, () => {
      this.store_configurations();
    });
  };

  store_configurations = () => {
    write_config(this.state.config);
  };

  get_configurations = () => {
    return this.state.config.configurations;
  };

  get_settings = () => {
    return this.state.config.settings;
  };

  render() {
    return (
      <globalContext.Provider
        value={{
          ...this.state,
          get_configurations: this.get_configurations,
          get_settings: this.get_settings,
          store_configurations: this.store_configurations,
          change_state: this.change_state,
        }}>
        {this.props.children}
      </globalContext.Provider>
    );
  }
}

export const withGlobalContext = ChildComponent => props => (
  <globalContext.Consumer>
    {context => <ChildComponent {...props} global={context} />}
  </globalContext.Consumer>
);
