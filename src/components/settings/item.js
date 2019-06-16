import React from 'react';
import '../../css/settings/item.css';
import Title from './title';
import Content from './content';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class SettingItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content_hidden: this.props.init_hidden,
    };
  }
  toggle = () => {
    this.setState({ content_hidden: !this.state.content_hidden });
  };
  render() {
    return (
      <div className="item">
        <Title
          icon={this.state.content_hidden ? <ExpandMore /> : <ExpandLess />}
          onClick={this.toggle}>
          {this.props.title}
        </Title>
        {this.state.content_hidden ? null : (
          <Content>{this.props.children}</Content>
        )}
      </div>
    );
  }
}

export default SettingItem;
