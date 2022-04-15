import React from 'react';
import clsx from 'clsx';
import styles from './navitem.module.css';

function NavItem(props) {
    return (
      <a href={props.href} className={clsx(styles.link, 'pt-4', 'pb-4', 'pr-5', 'pl-5', props.active && styles.link_active)}>
        {props.icon}
        <span className={'ml-2'}>{props.title}</span>
      </a>
    );
}

export default NavItem;