import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './profile.module.css';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import ProfileForm from '../../components/ProfileForm/ProfileForm';

import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/actions/auth';
import Loader from '../../components/Loader/Loader';

function Profile() {
  const dispatch = useDispatch();
  const { getUserRequest, getUserFailed } = useSelector(store => store.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (getUserRequest) {
    //console.log(getUserRequest);
    return (<Loader />)
  }

  if(getUserFailed) {
    console.log('getuser' . getUserFailed);
  }

  return (
    <div className={clsx(styles.main, 'pt-10', 'pl-10', 'pr-10', 'mt-10')}>
      <ProfileNav />
      <Switch>
        <Route path='/profile' exact={true}>
          <ProfileForm />
        </Route>
        <Route path='/profile/orders' exact={true}>
          <p className={clsx('text', 'text_type_main-default')}>История заказов</p>
        </Route>
      </Switch>      
    </div>
  );
}

export default Profile;
