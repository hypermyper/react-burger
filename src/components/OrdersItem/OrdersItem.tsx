import React, { FC } from 'react';
import clsx from 'clsx';
import PriceItem from '../PriceItem/PriceItem';
import styles from './ordersitem.module.css';
import { useSelector } from '../../utils/hooks';
import { conversionDateForCard, getPrice, getBurgerIngredients } from '../../utils/functions';
import { getStatus } from '../../utils/functions';
import { TProps } from './types';
import { TIngredient } from '../../types';


const OrdersItem: FC<TProps> = ({ number, name, ingredients, createdAt, status }) => {
  const { data } = useSelector((store) => store.ingredients);

  let numberOfIngredients = 6;
  const stringWithDay = conversionDateForCard(createdAt);
  const burgerIngredients = getBurgerIngredients(ingredients, data);
  const burgerItem = burgerIngredients.slice(0, numberOfIngredients);
  const count = burgerIngredients.length;

  const numberIngredients = count - numberOfIngredients;
  const burgerPrice = getPrice(burgerIngredients);
  const st = status ? getStatus(status) : null;


  return (
    <div className={clsx(styles['orders-item'], 'p-6')}>
      <div className={clsx(styles['orders-info'])}>
        <span className='text text_type_digits-default'>#{number}</span>
        <span className={'text text_type_main-default text_color_inactive'}>
          {stringWithDay}
        </span>
      </div>
      <div>
        <h2 className={clsx('text text_type_main-medium', 'mb-2')}>{name}</h2>
        {status ? (
          <span
            className={clsx(
              'text text_type_main-default',
              styles[`status_color__${st?.textColor}`]
            )}
          >
            {st?.text}
          </span>
        ) : null}
      </div>
      <div className={clsx(styles['orders-info'])}>
        <ul className={clsx(styles.list)}>
          {burgerItem.map((el: TIngredient, i: number) => {
            numberOfIngredients -= 1
            return (
              <li className={styles['list-item']} key={i} style={{ zIndex: numberOfIngredients }}>
                <div className={clsx(styles.icon)}>
                  <img src={el.image_mobile} className={clsx(styles.image)} alt="" />
                </div>
              </li>
            )
          })}
          {count > numberOfIngredients ? (<div className={styles.overlay}>
            <span>{`+${numberIngredients}`}</span>
          </div>) : null}
        </ul>
        <PriceItem price={burgerPrice} />
      </div>
    </div >
  );
}
export default OrdersItem;
