import React from 'react';
import clsx from 'clsx';
import { useSelector } from '../../utils/hooks';
import { filterOrdersByStatus } from '../../utils/functions';
import styles from './orderstable.module.css';
import { TOrder } from '../../types';

function OrdersTable() {
  const { total, totalToday, orders } = useSelector((store: any) => store.ws);
  const statusArrays = filterOrdersByStatus(orders);
  const doneArray = statusArrays?.done.slice(0, 30);

  return (
    <section className={clsx(styles.container)}>
      <div className={styles.table}>
        <div>
          <h2 className={clsx('text text_type_main-medium', 'mb-6')}>Готовы:</h2>
          <ul className={clsx(styles.list, styles['list_color_green'], 'text text_type_digits-default')}>
            {doneArray?.map((el: TOrder) => (<li key={el._id} className={clsx(styles['list-item'], 'mb-2', 'mr-4')}>{el.number}</li>))}
          </ul>
        </div>
        <div>
          <h2 className={clsx('text text_type_main-medium', 'mb-6')}>
            В работе:
          </h2>
          <ul className={clsx(styles.list, 'text text_type_digits-default')}>
            {statusArrays?.pending.map((el: TOrder) => (<li key={el._id} className={clsx(styles['list-item'], 'mb-2', 'mr-8')}>{el.number}</li>))}
          </ul>
        </div>
      </div>
      <div>
        <h2 className={clsx('text text_type_main-medium')}>
          Выполнено за все время:
        </h2>
        <span className={clsx('text text_type_digits-large', styles.count)}>
          {total || 0}
        </span>
      </div>
      <div>
        <h2 className={clsx('text text_type_main-medium')}>
          Выполнено за сегодня:
        </h2>
        <span className={clsx('text text_type_digits-large', styles.count)}>
          {totalToday || 0}
        </span>
      </div>
    </section>
  );
}

export default OrdersTable;