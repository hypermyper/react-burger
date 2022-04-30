import React from 'react';
import AppHeader from '../../components/AppHeader/AppHeader';
import Main from '../../components/Main/Main';
import Loader from '../../components/Loader/Loader.js';
import { API_URL } from '../../utils/constants';
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
  const getIngredients = async () => {
    try { 
      setState({...state, hasError: false, isLoading: true });
      const response = await fetch(`${API_URL}ingredients`);
      if (!response.ok) {
        throw new Error("response is not ok");
      }
      const data = await response.json();
      if (data && data.success === true) {          
        setState({...state, 
          data: data.data,
          burgerIngredients: data.data,
          isLoading: false})         
      } else {
        throw new Error("DataError");
      }
    }
    catch (e) {
      console.log(e);
      setState({...state, hasError: true, isLoading: false})
    }
  }
  getIngredients();
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
