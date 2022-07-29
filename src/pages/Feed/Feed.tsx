import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './feed.module.css';
import FeedOrders from '../../components/FeedOrders/FeedOrders';
import OrdersTable from '../../components/OrdersTable/OrdersTable';
import { useDispatch } from '../../utils/hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../utils/constants';

function Feed() {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch({ type: WS_CONNECTION_START });
      return () => {
        dispatch({ type: WS_CONNECTION_CLOSE })
      }
    },
    [dispatch]
  );

  useEffect(() => {
    document.title = 'Лента заказов';
  });  

  return (
    <div className={clsx(styles.col, 'p-10')}>
      <FeedOrders />
      <OrdersTable />
    </div>
  );
}

export default Feed;