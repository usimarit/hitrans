import React from 'react';
import Typography from '@material-ui/core/Typography';
import '../../css/settings/title.css';

class Title extends React.Component {
  render() {
    return (
      <div className="title" onClick={this.props.onClick}>
        <Typography variant="h6" gutterBottom className="text">
          {this.props.children}
        </Typography>
        <div className="button">{this.props.icon}</div>
      </div>
    );
  }
}

export default Title;
