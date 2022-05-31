import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {

  const { name } = useSelector(store => store.auth);
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
