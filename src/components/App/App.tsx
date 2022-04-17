import React from 'react';
import AppHeader from '../../components/AppHeader/AppHeader';
import Main from '../../components/Main/Main';
import data from '../../utils/data.js';
import styles from './app.module.css';
import clsx from 'clsx';

class App extends React.Component {
  render() {
    return (
      <div className={clsx('text', 'text_type_main-default')}>
        <AppHeader />
        <Main data={data} />
      </div>
    );
  }
}

export default App;
