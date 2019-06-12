import React from 'react';
import ScreenWrapper from '../components/general/ScreenWrapper';
import SettingItem from '../components/settings/item';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class SettingScreen extends React.Component {
  render() {
    return (
      <ScreenWrapper>
        <SettingItem title="Translation on text selection">
          <FormControl component="fieldset">
            <FormGroup onChange={this.selectionChanged} column>
              <FormControlLabel
                value="double_click"
                control={<Checkbox color="primary" />}
                label="On double click"
                labelPlacement="end"
              />
              <FormControlLabel
                value="highlight"
                control={<Checkbox color="primary" />}
                label="On finished selection"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </SettingItem>
        <SettingItem title="Shortcuts"></SettingItem>
      </ScreenWrapper>
    );
  }
}

export default SettingScreen;
