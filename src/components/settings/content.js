import React from 'react';
import '../../css/settings/content.css';

class Content extends React.Component {
  render() {
    return <div className="content">{this.props.children}</div>;
  }
}

export default Content;
