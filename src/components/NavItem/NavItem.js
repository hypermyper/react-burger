import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './navitem.module.css';

function NavItem(props) {
    return (
      <a href={props.href} className={clsx(styles.link, 'pt-4', 'pb-4', 'pr-5', 'pl-5', props.active && styles.link_active)}>
        {props.icon}
        <span className={'ml-2'}>{props.title}</span>
      </a>
    );
}

NavItem.propTypes = {
  href: PropTypes.string.isRequired,
  active: PropTypes.bool,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired
}

export default NavItem;