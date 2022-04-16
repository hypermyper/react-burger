import React from 'react';
import clsx from 'clsx';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerconstructor.module.css';

function BurgerConstructor(props) {
  return (
    <section className={clsx(styles.section, 'pt-25', 'pl-4')}>
      <div className={clsx('pl-8', styles.bun_section)}>
        {props.data.map((burger, index) => (
            (burger.type == 'bun') && (index == 0) && <ConstructorElement 
              type="top"
              isLocked={true}
              key={index}
              text={burger.name}
              thumbnail={burger.image}
              price={burger.price}
            />
          ))}        
      </div>
      <ul className={clsx(styles.content, 'mt-4', 'mb-4')}>
        {props.data.map((burger, index) => (
          (burger.type !== 'bun') && 
          <li className={clsx(styles.content_list)} >
            <DragIcon type="primary" />
            <ConstructorElement 
              key={index}
              text={burger.name}
              thumbnail={burger.image}
              price={burger.price}
            />
          </li>
        ))}
      </ul>    
      <div className={clsx('pl-8', styles.bun_section)}>
        {props.data.map((burger, index) => (
            (burger.type == 'bun') && (index == 0) && <ConstructorElement 
              type="bottom"
              isLocked={true}
              key={index}
              text={burger.name}
              thumbnail={burger.image}
              price={burger.price}
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

export default BurgerConstructor;