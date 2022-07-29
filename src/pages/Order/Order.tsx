import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './order.module.css';
import { useParams, Redirect, useRouteMatch } from 'react-router-dom';
import PriceItem from '../../components/PriceItem/PriceItem';
import { useDispatch, useSelector } from '../../utils/hooks';
import { getOrder, getUserOrder } from '../../services/actions/ingredients';
import Loader from '../../components/Loader/Loader';
import { conversionDateForCard, getStatus, getPrice, getBurgerIngredients, getBurgerIngredientsWithCount } from '../../utils/functions';

function Order() {
  const dispatch = useDispatch();
  const isProfile = !!useRouteMatch("/profile");
  const { id } = useParams<{ id: string }>();

  useEffect(
    () => {
      dispatch(isProfile
        ? getUserOrder(id)
        : getOrder(id)
      )
    },
    [dispatch, isProfile, id]
  );

  const { data } = useSelector((store) => store.ingredients);
  const currentOrder = useSelector((store) => store.ingredients.currentOrder);
  const { orderLoaded } = useSelector((store) => store.ingredients);

  const createdAt = currentOrder && currentOrder.createdAt && conversionDateForCard(currentOrder?.createdAt);
  const burgerIngredients = currentOrder && currentOrder.ingredients && getBurgerIngredients(currentOrder?.ingredients, data);
  const allBurgerIngredients = burgerIngredients && getBurgerIngredientsWithCount(burgerIngredients);
  const burgerPrice = burgerIngredients && getPrice(burgerIngredients);
  const status = currentOrder?.status ? getStatus(currentOrder?.status) : null;
  
  if (orderLoaded && !currentOrder) {
    return <Redirect to='/' />;
  }

  if (!currentOrder) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <span className={clsx('text text_type_digits-default')}>#{id}</span>
      <h1 className={clsx('text text_type_main-medium', 'mb-3', 'mt-10', styles.title)}>
        {currentOrder?.name}
      </h1>
      <p
        className={clsx('text text_type_main-default', 'mb-15', styles.status, styles[`status_color__${status?.textColor}`])}>
          {status?.text}
      </p>
      <p className={clsx('text text_type_main-medium', 'mb-6', styles.title)}>
        Состав:
      </p>
      <ul className={clsx(styles.list, 'mb-10')}>
        {currentOrder?.ingredients?.map((el: string, i: number) => {
          return <li className={clsx(styles['list-item'], 'mr-6')} key={i}>
            <div className={clsx(styles.icon, 'mr-4')}>
              <img src={allBurgerIngredients?.item[el]?.image_mobile} alt='React Burger' className={clsx(styles.image)} />
            </div>
            <p
              className={clsx(
                styles.ingredient,
                'mr-4',
                'text text_type_main-default'
              )}
            >
              {allBurgerIngredients?.item[el]?.name}
            </p>
            <span className={clsx('mr-1', 'text text_type_digits-default')}>
              {allBurgerIngredients?.count[el]} x{' '}
            </span>
            <PriceItem price={allBurgerIngredients?.item[el]?.price || 0} />
          </li>
        })}
      </ul>
      <div className={styles.info}>
        <span className={clsx('text text_type_main-default text_color_inactive')}>
          {createdAt}
        </span>
        <PriceItem price={burgerPrice || 0} />
      </div>
    </div>
  );
}

export default Order;