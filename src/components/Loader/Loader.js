import React from 'react';
import clsx from 'clsx';
import styles from './loader.module.css';

function Loader() {
  return (
    <main className={clsx('pl-10 pr-10', styles.loader)}>
      <div className={styles.lds_dual_ring}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </main>
  );
}

export default Loader;