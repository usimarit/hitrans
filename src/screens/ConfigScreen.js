import React from 'react';
import ScreenWrapper from '../components/general/ScreenWrapper';
import SettingItem from '../components/settings/item';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import '../css/settings/settings.css';

const lang = [
  {
    name: 'English',
    value: 'en',
  },
];

class ConfigScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source_lang: '',
      target_lang: '',
    };
  }
  changeLang = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  render() {
    return (
      <ScreenWrapper>
        <SettingItem title="Languages">
          <form className="languages" autoComplete="off">
            <FormControl
              className="languages_item"
              style={{ marginLeft: 0 }}
              variant="outlined">
              <InputLabel htmlFor="source_lang">Source</InputLabel>
              <Select
                value={this.state.source_lang}
                onChange={this.changeLang}
                input={<OutlinedInput name="source_lang" id="source_lang" />}>
                {lang.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl
              className="languages_item"
              style={{ marginRight: 0 }}
              variant="outlined">
              <InputLabel htmlFor="target_lang">Target</InputLabel>
              <Select
                value={this.state.target_lang}
                onChange={this.changeLang}
                input={<OutlinedInput name="target_lang" id="target_lang" />}>
                {lang.map((item, index) => {
                  return <MenuItem value={item.value}>{item.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </form>
        </SettingItem>
        <SettingItem title="Google API Key" init_hidden={true}></SettingItem>
        <SettingItem
          title="Google Translation Engine"
          init_hidden={true}></SettingItem>
      </ScreenWrapper>
    );
  }
}

export default ConfigScreen;
