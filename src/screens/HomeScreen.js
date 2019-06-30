import React from "react";
import ScreenWrapper from "../components/general/ScreenWrapper";
import "../css/general/home.css";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withGlobalContext } from "../components/context/global";

class HomeScreen extends React.Component {
  render() {
    const conf = this.props.global.config.configurations;
    return (
      <ScreenWrapper>
        <div className="home">
          <Typography variant="h4" gutterBottom className="title">
            Introduction
          </Typography>
          <p>
            Hitrans stands for "highlighted translation", which is also its main
            feature - automatically translate text selected on the screen using
            mouse or shortcuts
          </p>
          <p>
            Hitrans uses Google Translate API to translate texts. Therefore, API
            Key configuration is needed in order to use it.
          </p>
          <p>
            Configurations - place to store your Google API config, your config
            will be stored locally, so your key will be safe.
          </p>
          <p>Settings - stores application's config.</p>
          <Typography variant="h4" gutterBottom className="title">
            Status
          </Typography>
          <p>
            All status must be checked in order for Google Translate to work
            properly.
          </p>
          <FormGroup className="status">
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={conf && conf.source_lang ? true : false}
                />
              }
              label="Source language"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={conf && conf.target_lang ? true : false}
                />
              }
              label="Target language"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={
                    conf && conf.api_key && !conf.api_key.includes(" ")
                      ? true
                      : false
                  }
                />
              }
              label="Google API Key"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={conf && conf.model ? true : false}
                />
              }
              label="Google Translate API Model"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={conf && conf.version ? true : false}
                />
              }
              label="Google Translate API Version"
            />
          </FormGroup>
        </div>
      </ScreenWrapper>
    );
  }
}

export default withGlobalContext(HomeScreen);
