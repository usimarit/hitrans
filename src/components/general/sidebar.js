import React from 'react';
import '../../css/general/app.css';
import '../../css/general/sidebar.css';
import { withRouter } from 'react-router-dom';

const inactiveBgColor = 'transparent';
const activeBgColor = '#01579B';
const inactiveFS = 'normal';
const activeFS = 'italic';
const inactiveColor = 'white';
const activeColor = 'white';
const inactiveFW = 'normal';
const activeFW = 'bold';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: inactiveBgColor,
      fontStyle: inactiveFS,
      color: inactiveColor,
      fontWeight: inactiveFW,
    };

    this.props.history.listen(location => {
      if (this.props.item.path !== location.pathname) {
        this.setInactive();
      } else {
        this.setActive();
      }
    });
  }
  componentWillMount = () => {
    if (this.props.history.location.pathname === this.props.item.path) {
      this.setActive();
    }
  };
  setInactive = () => {
    this.setState({
      bgColor: inactiveBgColor,
      fontStyle: inactiveFS,
      color: inactiveColor,
      fontWeight: inactiveFW,
    });
  };
  setActive = () => {
    this.setState({
      bgColor: activeBgColor,
      fontStyle: activeFS,
      color: activeColor,
      fontWeight: activeFW,
    });
  };
  handleClick = () => {
    this.props.history.push(this.props.item.path);
  };
  render() {
    return (
      <button
        className="button"
        style={{
          backgroundColor: this.state.bgColor,
          fontStyle: this.state.fontStyle,
          color: this.state.color,
          fontWeight: this.state.fontWeight,
        }}
        onClick={this.handleClick}>
        {this.props.item.name}
      </button>
    );
  }
}

class Sidebar extends React.Component {
  renderButton = (item, index) => {
    return <Button history={this.props.history} key={index} item={item} />;
  };
  render() {
    return (
      <div className="sidebar">
        <h1 className="title">Menu</h1>
        <div className="button-list">
          {this.props.buttons.map((item, index) => {
            return this.renderButton(item, index);
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Sidebar);
