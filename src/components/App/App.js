import React from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { Main, Login, Register, ForgotPassword, ResetPassword, Profile, NotFound } from '../../pages';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { useSelector } from 'react-redux';

function App() {
  const hasToken = localStorage.getItem('refreshToken');
	const location = useLocation();
	const history = useHistory();
	const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;  
  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <Main />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/register" exact={true}>
          <Register />
        </Route>
				<Route path="/forgot-password" exact={true}>
          <ForgotPassword />
				</Route>
				<Route path="/reset-password" exact={true}>
					<ResetPassword />
				</Route>       
				<ProtectedRoute path='/profile'>
					<Profile />
				</ProtectedRoute> 
				<Route path='/ingredients/:id' exact={true}>
					<IngredientDetails />
				</Route>
				<Route>
          <NotFound />          
				</Route>                
      </Switch>
			{background &&
				(<>
					<Route path='/' exact={true} children={<Modal><OrderDetails /></Modal>} />
					<Route path='/ingredients/:id' children={<Modal><IngredientDetails /></Modal>} />
				</>
				)}  
    </>            
  );
}

export default App;
