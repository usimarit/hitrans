import React from 'react';
import logo from './logo.svg';
import './App.css';
import popUp from './components/popup';

function App() {
  return (
    <div>
      <p>Hello</p>
      <button
        onClick={() => {
          popUp();
        }}>
        Popup
      </button>
    </div>
  );
}

export default App;
