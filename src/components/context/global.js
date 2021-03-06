import React from "react";
import Loading from "../../components/general/loading";

const ipcRenderer = window.electron.ipcRenderer;
const globalContext = React.createContext();

export default class GlobalContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      config: {},
      source_lang: [],
      target_lang: [],
      engine: [],
      version: [],
      lookup_lang: {},
    };
  }

  componentWillMount = () => {
    ipcRenderer.send("create-config-file");
    ipcRenderer.on("create-config-file-reply", (event, arg) => {
      let data = JSON.parse(arg);
      console.log(data);
      this.setState({ config: data });
    });
    ipcRenderer.on("write-config-file-reply", (event, arg) => {
      console.log(arg);
    });
    ipcRenderer.on("get-config-file-reply", (event, arg) => {
      let data = JSON.parse(arg);
      this.setState({ config: data });
    });
    ipcRenderer.send("get-google-translate-config");
    ipcRenderer.on("get-google-translate-config-reply", (event, arg) => {
      let data = JSON.parse(arg);
      this.setState({
        source_lang: data.lang,
        target_lang: data.lang.slice(1, data.lang.length),
        engine: data.engine,
        lookup_lang: data.lookup_lang,
        version: data.version,
      });
    });
  };

  componentDidMount = () => {
    this.setState({ loading: false });
  };

  componentWillUnmount = () => {
    ipcRenderer.removeAllListeners();
  };

  change_config = (name, data) => {
    let _new_config = this.state.config;
    _new_config["configurations"][name] = data;
    this.setState({ config: _new_config }, () => {
      this.store_configurations();
    });
  };

  change_settings = (option, name, data) => {
    let _new_config = this.state.config;
    _new_config["settings"][option][name] = data;
    this.setState({ config: _new_config }, () => {
      this.store_configurations();
    });
  };

  store_configurations = () => {
    ipcRenderer.send("write-config-file", JSON.stringify(this.state.config));
  };

  get_configurations = () => {
    return this.state.config.configurations;
  };

  get_settings = () => {
    return this.state.config.settings;
  };

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <globalContext.Provider
        value={{
          ...this.state,
          get_configurations: this.get_configurations,
          get_settings: this.get_settings,
          store_configurations: this.store_configurations,
          change_config: this.change_config,
          change_settings: this.change_settings,
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
