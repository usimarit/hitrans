import React from 'react';
import ScreenWrapper from '../components/general/ScreenWrapper';
import '../css/general/home.css';

class HomeScreen extends React.Component {
  render() {
    return (
      <ScreenWrapper>
        <div className="home">
          <h1 className="title">Status</h1>
        </div>
      </ScreenWrapper>
    );
  }
}

export default HomeScreen;
