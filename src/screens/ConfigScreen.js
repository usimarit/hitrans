import React from "react";
import ScreenWrapper from "../components/general/ScreenWrapper";
import SettingItem from "../components/settings/item";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import "../css/settings/config.css";
import { withGlobalContext } from "../components/context/global";

class ConfigScreen extends React.Component {
  changeLang = e => {
    this.props.global.change_state(
      "configurations",
      e.target.name,
      e.target.value
    );
  };
  changeEngine = e => {
    this.props.global.change_state("configurations", "model", e.target.value);
  };
  changeVersion = e => {
    this.props.global.change_state("configurations", "version", e.target.value);
  };
  changeKey = e => {
    this.props.global.change_state("configurations", "api_key", e.target.value);
  };
  render() {
    return (
      <ScreenWrapper>
        <SettingItem title="Languages">
          <p>Choose languages to translate from (source) and to (target)</p>
          <form className="languages" autoComplete="off">
            <FormControl className="languages_item" style={{ marginLeft: 0 }}>
              <InputLabel htmlFor="source_lang">Source</InputLabel>
              <Select
                value={
                  this.props.global.config.configurations
                    ? this.props.global.config.configurations.source_lang
                    : this.props.global.source_lang[0].value
                }
                onChange={this.changeLang}
                inputProps={{
                  name: "source_lang",
                  id: "source_lang"
                }}
              >
                {this.props.global.source_lang.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className="languages_item" style={{ marginRight: 0 }}>
              <InputLabel htmlFor="target_lang">Target</InputLabel>
              <Select
                value={
                  this.props.global.config.configurations
                    ? this.props.global.config.configurations.target_lang
                    : this.props.global.target_lang[0].value
                }
                onChange={this.changeLang}
                inputProps={{
                  name: "target_lang",
                  id: "target_lang"
                }}
              >
                {this.props.global.target_lang.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </form>
        </SettingItem>
        <SettingItem title="Google API Key">
          <TextField
            placeholder="Enter your key here"
            fullWidth
            onChange={this.changeKey}
            value={
              this.props.global.config.configurations
                ? this.props.global.config.configurations.api_key
                : ""
            }
          />
        </SettingItem>
        <SettingItem title="Google Translation Engine">
          <Select
            value={
              this.props.global.config.configurations
                ? this.props.global.config.configurations.model
                : this.props.global.engine[0].value
            }
            onChange={this.changeEngine}
            displayEmpty
          >
            {this.props.global.engine.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </SettingItem>
        <SettingItem title="Google Translation Version">
          <Select
            value={
              this.props.global.config.configurations
                ? this.props.global.config.configurations.version
                : this.props.global.version[1].value
            }
            onChange={this.changeVersion}
            displayEmpty
          >
            {this.props.global.version.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </SettingItem>
      </ScreenWrapper>
    );
  }
}

export default withGlobalContext(ConfigScreen);
