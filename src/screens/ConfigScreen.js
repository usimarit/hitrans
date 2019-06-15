import React from 'react';
import ScreenWrapper from '../components/general/ScreenWrapper';
import SettingItem from '../components/settings/item';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import '../css/settings/config.css';

const lang = [
  {
    name: 'Auto detect languages',
    value: 'auto',
  },
  {
    name: 'English',
    value: 'en',
  },
];

const source_lang = lang;
const target_lang = lang.slice(1, lang.length);
const engine = [
  {
    name: 'Neural Network',
    value: 'nn',
  },
];

class ConfigScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source_lang: '',
      target_lang: '',
      engine: engine[0].value,
    };
  }
  changeLang = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  changeEngine = e => {
    this.setState({ engine: e.target.value });
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
                value={this.state.source_lang}
                onChange={this.changeLang}
                inputProps={{
                  name: 'source_lang',
                  id: 'source_lang',
                }}>
                {source_lang.map((item, index) => {
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
                value={this.state.target_lang}
                onChange={this.changeLang}
                inputProps={{
                  name: 'target_lang',
                  id: 'target_lang',
                }}>
                {target_lang.map((item, index) => {
                  return <MenuItem value={item.value}>{item.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </form>
        </SettingItem>
        <SettingItem title="Google API Key">
          <TextField placeholder="Enter your key here" fullWidth />
        </SettingItem>
        <SettingItem title="Google Translation Engine">
          <Select
            value={this.state.engine}
            onChange={this.changeEngine}
            displayEmpty>
            {engine.map((item, index) => {
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

export default ConfigScreen;
