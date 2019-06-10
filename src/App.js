import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ConfigScreen from './screens/ConfigScreen';
import SettingScreen from './screens/SettingScreen';
import Sidebar from './components/general/sidebar';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

const screens = [
  {
    screen: ConfigScreen,
    path: '/config',
  },
  {
    screen: SettingScreen,
    path: '/settings',
  },
];

const buttons = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Configurations',
    path: '/config',
  },
  {
    name: 'Settings',
    path: '/settings',
  },
];

function App() {
  return (
    <div className="body">
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
    </div>
  );
}

export default App;
