import React from 'react';
import clsx from 'clsx';
import propTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgeringredients.module.css';
import BurgerIngredientsSecton from '../../components/BurgerIngredientsSecton/BurgerIngredientsSection';

function BurgerIngredients({ data }) {

  const [current, setCurrent] = React.useState('Булки');

  return (
    <section className={clsx(styles.section, 'pt-10')}>
      <h1 className={clsx('text', 'text_type_main-large', 'pb-5')}>Соберите бургер</h1>
      <div className={clsx(styles.tab, 'mb-10')}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <section className={clsx(styles.content, 'mb-4')}>
        <BurgerIngredientsSecton 
          data={data} 
          title="Булки" 
          type="bun"
        />
        <BurgerIngredientsSecton 
          data={data} 
          title="Соусы" 
          type="sauce" 
        />
        <BurgerIngredientsSecton 
          data={data} 
          title="Начинки" 
          type="main" 
        />
      </section>              
    </section>
  )
}

export default BurgerIngredients;