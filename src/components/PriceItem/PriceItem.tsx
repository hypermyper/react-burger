import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './priceitem.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TProps } from './types';

const PriceItem: FC<TProps> = ({ price, classMarg }) => {
  return (
    <span className={clsx(styles['element-price'], 'text', [classMarg])}>
      {price} <CurrencyIcon type='primary' />
    </span>
  );
}

export default PriceItem;