import React, { useEffect, FC } from 'react';
import clsx from 'clsx';
import styles from './profile.module.css';
import { Switch, Route } from 'react-router-dom';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import ProfileOrders from '../../components/ProfileOrders/ProfileOrders';

import { useDispatch, useSelector } from '../../utils/hooks';
import { getUser } from '../../services/actions/auth';
import Loader from '../../components/Loader/Loader';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const { getUserRequest, getUserFailed } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    document.title = 'Личный кабинет';
  });    
  
  if (getUserRequest) {
    //console.log(getUserRequest);
    return (<Loader />)
  }

  if(getUserFailed) {
    console.log(getUserFailed);
  }


  return (
    <div className={clsx(styles.main, 'pt-10', 'pl-10', 'pr-10', 'mt-10')}>
      <ProfileNav />
      <Switch>
        <Route path='/profile' exact={true}>
          <ProfileForm />
        </Route>
        <Route path='/profile/orders' exact={true}>
          <ProfileOrders />
        </Route>       
      </Switch>      
    </div>
  );
}

export default Profile;