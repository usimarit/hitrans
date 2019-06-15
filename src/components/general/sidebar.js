import React from 'react';
import '../../css/general/app.css';
import '../../css/general/sidebar.css';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const inactiveBgColor = 'transparent';
const activeBgColor = '#01579B';
const inactiveFS = 'normal';
const activeFS = 'italic';
const inactiveColor = 'white';
const activeColor = 'white';

const MenuSlideShow = ['안녕', 'Hello', 'Hallo', 'Xin chào'];

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: inactiveBgColor,
      fontStyle: inactiveFS,
      color: inactiveColor,
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
    });
  };
  setActive = () => {
    this.setState({
      bgColor: activeBgColor,
      fontStyle: activeFS,
      color: activeColor,
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
        }}
        onClick={this.handleClick}>
        <span>{this.props.item.name}</span>
      </button>
    );
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: MenuSlideShow[0],
      count: 0,
    };
  }
  componentWillMount = () => {
    var intervalId = setInterval(this.slideshow, 2000);
    this.setState({ intervalId: intervalId });
  };
  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  };
  slideshow = () => {
    if (parseInt(this.state.count) === parseInt(MenuSlideShow.length - 1)) {
      this.setState({ count: 0 }, () => {
        this.setState({ menu: MenuSlideShow[this.state.count] });
      });
    } else {
      this.setState({ count: this.state.count + 1 }, () => {
        this.setState({ menu: MenuSlideShow[this.state.count] });
      });
    }
  };
  renderButton = (item, index) => {
    return <Button history={this.props.history} key={index} item={item} />;
  };
  render() {
    return (
      <div className="sidebar">
        <div className="title">
          <Typography variant="h3" gutterBottom>
            {this.state.menu}
          </Typography>
        </div>
        <div className="button-list">
          {this.props.buttons.map((item, index) => {
            return this.renderButton(item, index);
          })}
        </div>
        <div className="authors">
          <h2>Developed by</h2>
          <p>Huy Le Nguyen</p>
          <p>Khoa Anh Nguyen</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Sidebar);
