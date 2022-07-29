import React, { FC, useEffect } from 'react';
import clsx from 'clsx';
import styles from './notfound.module.css';

const NotFound: FC = () => {

  useEffect(() => {
    document.title = 'Страница не найдена';
  });   

  return (
    <div className={clsx(styles.content, 'text', 'text_type_digits-large')}>
      404
    </div>
  )
}

export default NotFound;