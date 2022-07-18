import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute: FC<{
    path: string;
    exact?: boolean;
  }> = ({ children, ...rest }) => {

  const { name } = useSelector( (store: any) => store.auth);
  const hasToken = localStorage.getItem('token');

  if (!hasToken && !name) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={({ location }) => children}
    />
  );
}
