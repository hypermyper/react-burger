import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerconstructor.module.css';

const dataPropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired
});

function BurgerConstructor({ data }) {
  return (
    <section className={clsx(styles.section, 'pt-25', 'pl-4')}>
      <div className={clsx('pl-8', styles.bun_section)}>
        {data.map((burger, index) => (
            (burger.type == 'bun') && (index == 0) && <ConstructorElement 
              type="top"
              isLocked={true}
              text={burger.name + ' (верх)'}
              thumbnail={burger.image}
              price={burger.price}
              key={burger._id}
            />
          ))}        
      </div>
      <ul className={clsx(styles.content, 'mt-4', 'mb-4')}>
        {data.map((burger) => (
          (burger.type !== 'bun') && 
          <li className={clsx(styles.content_list)} key={burger._id}>
            <DragIcon type="primary" />
            <ConstructorElement 
              text={burger.name}
              thumbnail={burger.image}
              price={burger.price}
            />
          </li>
        ))}
      </ul>    
      <div className={clsx('pl-8', styles.bun_section)}>
        {data.map((burger, index) => (
            (burger.type == 'bun') && (index == 0) && <ConstructorElement 
              type="bottom"
              isLocked={true}
              text={burger.name + ' (низ)'}
              thumbnail={burger.image}
              price={burger.price}
              key={burger._id}
            />
          ))}   
      </div>  
      <div className={clsx(styles.total, 'pt-10')}>
        <span className={clsx(styles.price, 'mr-10', 'text_type_digits-medium')}>2610 <CurrencyIcon type="primary" /></span>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>     
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default BurgerConstructor;