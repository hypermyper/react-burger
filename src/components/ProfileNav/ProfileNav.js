import React from 'react';
import clsx from 'clsx';
import styles from './profilenav.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';

const ProfileNav = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(logout());
  };

  return (
    <div className={clsx(styles.nav)}>
      <ul className={clsx(styles.list_nav, 'mb-20')}>
        <li>
          <NavLink exact to='/profile' className={clsx(styles.link, 'pt-4', 'pb-4', 'pr-5', 'mr-2', 'text', 'text_type_main-medium', 'text_color_inactive')} activeClassName={styles.link_active}>
            <span className={clsx('ml-2')}>Профиль</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/profile/orders' className={clsx(styles.link, 'pt-4', 'pb-4', 'pr-5', 'mr-2', 'text', 'text_type_main-medium', 'text_color_inactive')} activeClassName={styles.link_active}>
            <span className={clsx('ml-2')}>История заказов</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/login' className={clsx(styles.link, 'pt-4', 'pb-4', 'pr-5', 'mr-2', 'text', 'text_type_main-medium', 'text_color_inactive')} activeClassName={styles.link_active}>
            <span className={clsx('ml-2')} onClick={clickHandler}>
              Выход
            </span>
          </NavLink>
        </li>
      </ul>
      {pathname === '/profile' ? (
        <span className={clsx('text', 'text_type_main-default', 'text_color_inactive')}>
          В этом разделе вы можете изменить свои персональные данные
        </span>
      ) : ''}
    </div>
  );
};

export default ProfileNav;
