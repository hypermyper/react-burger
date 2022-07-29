import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import OrdersItem from '../OrdersItem/OrdersItem';
import { useSelector } from '../../utils/hooks';
import styles from './feedorders.module.css';
import { TOrder } from '../../types';
import Loader from '../Loader/Loader';

function FeedOrders() {
  const location = useLocation();
  const { orders } = useSelector((store: any) => store.ws || {});

  if (!orders) {
    return <Loader />
  }

  return (
    <section>
      <h1 className={clsx('text', 'text_type_main-large', 'mb-5')}>
        Лента заказов
      </h1>
      <ul className={clsx(styles.list)}>
        {orders?.map((el: TOrder) => (
          <li className={clsx(styles['list-item'], 'mb-4')} key={el._id}>
            <Link to={{
              pathname: `/feed/${el.number}`,
              state: { background: location }
            }}
              className={styles.link}>
              <OrdersItem
                number={el.number}
                name={el.name}
                ingredients={el.ingredients}
                createdAt={el.createdAt}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FeedOrders;