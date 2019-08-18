import React from "react";
import ScreenWrapper from "../components/general/ScreenWrapper";
import SettingItem from "../components/settings/item";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import "../css/settings/settings.css";
import { withGlobalContext } from "../components/context/global";

class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  selectionChanged = name => e => {
    this.props.global.change_settings("text_selection", name, e.target.checked);
  };
  shortcutChanged = name => e => {
    this.props.global.change_settings("shortcut", name, e.target.checked);
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
                    color="primary"
                    onChange={this.selectionChanged("double_click")}
                    checked={
                      this.props.global.config.settings
                        ? this.props.global.config.settings.text_selection
                            .double_click
                        : false
                    }
                  />
                }
                label="On double click"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    onChange={this.selectionChanged("finished_selection")}
                    checked={
                      this.props.global.config.settings
                        ? this.props.global.config.settings.text_selection
                            .finished_selection
                        : false
                    }
                  />
                }
                label="On finished selection"
              />
            </FormGroup>
          </FormControl>
        </SettingItem>
        <SettingItem title="Shortcuts">
          <p>
            {"Current shortcut: "}
            {this.props.global.config.settings.shortcut.alt ? "Alt" : ""}{" "}
            {this.props.global.config.settings.shortcut.shift ? "Shift" : ""}{" "}
            {this.props.global.config.settings.shortcut.ctrl ? "Ctrl" : ""}{" "}
            {!this.props.global.config.settings.shortcut.alt &&
            !this.props.global.config.settings.shortcut.shift &&
            !this.props.global.config.settings.shortcut.ctrl
              ? "None"
              : " + b"}
          </p>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  onChange={this.shortcutChanged("alt")}
                  checked={
                    this.props.global.config.settings
                      ? this.props.global.config.settings.shortcut.alt
                      : false
                  }
                />
              }
              label="Alt"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  onChange={this.shortcutChanged("shift")}
                  checked={
                    this.props.global.config.settings
                      ? this.props.global.config.settings.shortcut.shift
                      : false
                  }
                />
              }
              label="Shift"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  onChange={this.shortcutChanged("ctrl")}
                  checked={
                    this.props.global.config.settings
                      ? this.props.global.config.settings.shortcut.ctrl
                      : false
                  }
                />
              }
              label="Ctrl"
            />
          </FormGroup>
        </SettingItem>
      </ScreenWrapper>
    );
  }
}

export default withGlobalContext(SettingScreen);
