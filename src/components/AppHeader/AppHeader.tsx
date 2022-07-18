import React from 'react';
import clsx from 'clsx';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './appheader.module.css';
import { NavLink, useRouteMatch } from 'react-router-dom';

function AppHeader() {
  const isConstructor = !!useRouteMatch({ path: '/', exact: true });
  const isProfile = !!useRouteMatch('/profile');  
  return (
    <header className={clsx(styles.header, 'text', 'text_type_main-default')}>
      <nav className={styles.nav}>
          <div className={styles.links}>
            <ul className={styles.nav__item}>
              <li className={styles.nav__item_li}>
                <NavLink exact to='/' className={clsx(styles.link, 'pt-4', 'pb-4', 'pr-5', 'pl-5')} activeClassName={styles.link_active}>
                  <BurgerIcon type={isConstructor ? 'primary' : 'secondary'}  />
                  <span className={clsx('ml-2')}>Конструктор</span>
                </NavLink>
              </li>
              <li className={styles.nav__item_li}>
                <NavLink exact to='/' className={clsx(styles.link, 'pt-4', 'pb-4', 'pr-5', 'pl-5')} activeClassName={styles.link_active}>                
                  <ListIcon type="secondary" />
                  <span className={clsx('ml-2')}>Лента заказов</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={styles.logo}>
            <NavLink to='/'><Logo /></NavLink>
          </div>
          <div className={styles.account}>
            <NavLink to='/profile' activeClassName={styles.link_active} className={clsx(styles.link, 'pt-4', 'pb-4', 'pr-5', 'pl-5')}>
              <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
              <span className={clsx('ml-2')}>Личный кабинет</span>
            </NavLink>
          </div>
      </nav>
    </header>  
  );
}

export default AppHeader;