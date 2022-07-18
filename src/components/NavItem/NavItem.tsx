import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './navitem.module.css';

type TProps = {
    icon?: React.FC,
    title: string;
}

const NavItem = ( icon: React.FC, title: string ) => {
    return (
      <>
        {icon}
        <span className={'ml-2'}>{title}</span>
      </>
    );
}

/* NavItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired
} */

export default NavItem;