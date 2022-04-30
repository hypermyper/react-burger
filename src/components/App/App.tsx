import React from 'react';
import AppHeader from '../../components/AppHeader/AppHeader';
import Main from '../../components/Main/Main';
import Loader from '../../components/Loader/Loader.js';
//import { API_URL } from '../../utils/constants';
import { getIngredients } from '../../utils/api';
import { BurgerContext } from '../../utils/appContext';
import clsx from 'clsx';

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
    burgerIngredients: []
  });

React.useEffect(() => {
  setState({...state, hasError: false, isLoading: true });
    getIngredients()
      .then((data) => {          
        setState({...state, 
          data: data.data,
          burgerIngredients: data.data,
          isLoading: false})         
      })
      .catch((err) => {
        setState({...state, hasError: true, isLoading: false})
      })
    }, []);  

const { data, isLoading, hasError } = state;

  return (
    <div className={clsx('text', 'text_type_main-default')}>
      <AppHeader />
        <BurgerContext.Provider value={{ state, setState }}>
          {isLoading && <Loader />}
          {hasError && 'Произошла ошибка'}
          {!isLoading && !hasError && data.length && <Main />}
        </BurgerContext.Provider>
    </div>
  );
}

export default App;
