import React from 'react';
import clsx from 'clsx';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerconstructor.module.css';

function BurgerConstructor(props) {
  return (
    <section className={clsx(styles.section, 'pt-25 pl-4 pr-4')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
      <div className={clsx(styles.content, 'mt-4 mb-4')}>
        {props.data.map((burger, index) => (
          (burger.type !== 'bun') && <ConstructorElement 
            key={index}
            text={burger.name}
            thumbnail={burger.image}
            price={burger.price}
          />
        ))}
      </div>    
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
        <span className={clsx(styles.price, 'mr-10', 'text_type_digits-medium')}>610 <CurrencyIcon type="primary" /></span>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>     
    </section>
  )
}

export default BurgerConstructor;