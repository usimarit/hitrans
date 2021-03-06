import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ConfigScreen from "./screens/ConfigScreen";
import SettingScreen from "./screens/SettingScreen";
import Sidebar from "./components/general/sidebar";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import GlobalContextProvider from "./components/context/global";

const screens = [
  {
    screen: ConfigScreen,
    path: "/config"
  },
  {
    screen: SettingScreen,
    path: "/settings"
  }
];

const buttons = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Configurations",
    path: "/config"
  },
  {
    name: "Settings",
    path: "/settings"
  }
];

class App extends React.Component {
  render() {
    return (
      <div className="body">
        <GlobalContextProvider>
          <Router>
            <Sidebar buttons={buttons} />
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              {screens.map((item, index) => (
                <Route key={index} path={item.path} component={item.screen} />
              ))}
              <Route component={() => <p>Not found</p>} />
            </Switch>
          </Router>
        </GlobalContextProvider>
      </div>
    );
  }
}

export default App;
