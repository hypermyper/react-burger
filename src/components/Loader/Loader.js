import clsx from 'clsx';
import styles from './loader.module.css';

function Loader() {
  return (
    <main className={clsx('pl-10 pr-10', styles.loader)}>
      Загрузка…
    </main>
  );
}

export default Loader;