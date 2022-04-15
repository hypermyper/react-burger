import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import Main from './components/Main/Main';
import data from './utils/data.js';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App text_type_main-default">
        <AppHeader />
        <Main data={data} />
      </div>
    );
  }
}

export default App;
