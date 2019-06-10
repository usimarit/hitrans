import React from 'react';
import '../../css/general/app.css';

class ScreenWrapper extends React.Component {
  render() {
    return <div className="screen">{this.props.children}</div>;
  }
}

export default ScreenWrapper;
