import React from 'react';
import clsx from 'clsx';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import NavItem from '../NavItem/NavItem';
import styles from './appheader.module.css';

function AppHeader() {
  return (
    <header className={clsx(styles.header, 'text', 'text_type_main-default')}>
      <nav className={styles.nav}>
          <div className={styles.links}>
            <ul className={styles.nav__item}>
              <li className={styles.nav__item_li}><NavItem icon={<BurgerIcon type="primary" />} title="Конструктор" href="/" active={true} /></li>
              <li className={styles.nav__item_li}><NavItem icon={<ListIcon type="secondary" />} title="Лента заказов" href="/" /></li>
            </ul>
          </div>
          <div className={styles.logo}><a href="/"><Logo /></a></div>
          <div className={styles.account}><NavItem icon={<ProfileIcon type="secondary" />} title="Личный кабинет" href="/" /></div>
      </nav>
    </header>  
  );
}

export default AppHeader;