import React from 'react';
import clsx from 'clsx';
import styles from './notfound.module.css';

function NotFound() {
  return (
    <div className={clsx(styles.content, 'text', 'text_type_digits-large')}>
      404
    </div>
  )
}

export default NotFound;