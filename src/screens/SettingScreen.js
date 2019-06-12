import React from 'react';
import ScreenWrapper from '../components/general/ScreenWrapper';
import SettingItem from '../components/settings/item';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import '../css/settings/settings.css';

class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      double_click: false, // Load settings
      highlight: false, // Load settings
      is_current_shortcut: false, // Load settings
      current_shortcut: 'No value set',
      is_pressing_keys: false,
    };
  }
  selectionChanged = name => e => {
    this.setState({ ...this.state, [name]: e.target.checked });
  };
  checkExistingKeyComb = (key_comb, callback) => {
    callback();
  };
  handleInputCombination = callback => {
    this.checkExistingKeyComb([], callback);
  };
  changeShortcut = () => {
    this.setState({
      current_shortcut: 'Press key combinations',
      is_pressing_keys: true,
    });
    // Handle input combinations
    this.handleInputCombination(() => {
      this.setState({ is_pressing_keys: false });
    });
  };
  render() {
    return (
      <ScreenWrapper>
        <SettingItem title="Translation on text selection">
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value="double_click"
                    color="primary"
                    onChange={this.selectionChanged('double_click')}
                    checked={this.state.double_click}
                  />
                }
                label="On double click"
              />
              <FormControlLabel
                value="highlight"
                control={
                  <Checkbox
                    color="primary"
                    onChange={this.selectionChanged('highlight')}
                    checked={this.state.highlight}
                  />
                }
                label="On finished selection"
              />
            </FormGroup>
          </FormControl>
        </SettingItem>
        <SettingItem title="Shortcuts">
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Button
                    variant="contained"
                    className="shortcut"
                    disabled={this.state.is_pressing_keys}
                    onClick={this.changeShortcut}
                    color={this.state.is_current_shortcut ? 'primary' : null}>
                    {this.state.current_shortcut}
                  </Button>
                }
                label="Click to change keyboard shortcut"
                labelPlacement="start"
              />
            </FormGroup>
          </FormControl>
        </SettingItem>
      </ScreenWrapper>
    );
  }
}

export default SettingScreen;
