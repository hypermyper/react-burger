import React, { useEffect } from 'react';
import AppHeader from '../../components/AppHeader/AppHeader';
import Main from '../../components/Main/Main';
import Loader from '../../components/Loader/Loader.js';
//import { API_URL } from '../../utils/constants';
//import { getBurgerIngredients } from '../../services/actions/ingredients';
//import { BurgerContext } from '../../utils/appContext';

import clsx from 'clsx';

function App() {

  return (
    <div className={clsx('text', 'text_type_main-default')}>
      <AppHeader />
      <Main />
    </div>
  );
}

export default App;
