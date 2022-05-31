import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './navitem.module.css';

function NavItem(props) {
    return (
      <>
        {props.icon}
        <span className={'ml-2'}>{props.title}</span>
      </>
    );
}

NavItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired
}

export default NavItem;