import React, { useEffect, FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { refreshToken } from '../../services/actions/auth';
import { useSelector, useDispatch } from '../../utils/hooks';
import Loader from '../Loader/Loader';

export const ProtectedRoute: FC<{
    path: string;
    exact?: boolean;
  }> = ({ children, ...rest }) => {


  const dispatch = useDispatch();
  const isTokenUpdated = useSelector((store: any) => store.auth.isTokenUpdated);
  const tokenUpdateDate = useSelector((store: any) => store.auth.tokenUpdateDate);

  const hasToken = !!localStorage.getItem('refreshToken');

  useEffect(() => {
    if (!isTokenUpdated && hasToken) {
      dispatch(refreshToken())
    }
  }, [dispatch, hasToken, isTokenUpdated]);  

  if (hasToken && !isTokenUpdated) {
    return <Loader />;
  }  

  return (
    <Route
      {...rest}
      render={({ location }) =>
        (hasToken && tokenUpdateDate) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
