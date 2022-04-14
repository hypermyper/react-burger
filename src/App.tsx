import React from 'react';
import { Tab, Logo, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import img from './logo.svg';
import './App.css';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={img}
          />
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
          />
    </div>
      </header>
    </div>
  );
}

export default App;
