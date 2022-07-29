import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { Main, Login, Register, ForgotPassword, ResetPassword, Profile, NotFound, Feed, Order } from '../../pages';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { useDispatch, useSelector } from '../../utils/hooks';
import { getBurgerIngredients } from '../../services/actions/ingredients';
import { TLocationTemplate } from '../../types';

function App() {
//  const hasToken = localStorage.getItem('refreshToken');
	const location = useLocation<TLocationTemplate>();
	const history = useHistory();
	const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background; 

	const dispatch = useDispatch();
	const { loaded } = useSelector((store) => store.ingredients);

	useEffect(() => {
		if (!loaded) {
			dispatch(getBurgerIngredients());
		}	
	}, [dispatch, loaded]);	

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
				<Route path='/feed' exact={true}>
					<Feed />
				</Route>
				<Route path='/feed/:id'>
					<Order />
				</Route>			  
				<ProtectedRoute path='/profile/orders/:id' exact={true}>
					<Order />
				</ProtectedRoute>		
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
				(
					<>
						<Route path='/' exact={true} children={<Modal><OrderDetails /></Modal>} />
						<Route path='/ingredients/:id' render={() => <Modal><IngredientDetails /></Modal>} />
						<ProtectedRoute path='/profile/orders/:id' children={<Modal><Order /></Modal>} />
						<Route path='/feed/:id' render={() => <Modal><Order /></Modal>} />					
					</>
				)
			}  
    </>            
  );
}

export default App;
