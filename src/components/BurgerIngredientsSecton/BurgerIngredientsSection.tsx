import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './burgeringredientssection.module.css';
import BurgerElement from '../BurgerElement/BurgerElement';
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from '../../types';

type TIngredientRef = {
	title: string, array: Array<TIngredient>, type: string, renderModal: (item: TIngredient) => void, id: string
}

const BurgerIngredientsSecton = forwardRef<HTMLHeadingElement, TIngredientRef>(({ title, array, type, renderModal, id }, ref) => {

  const location = useLocation();

  return (
    <>
      <h2 className={clsx('text', 'text_type_main-medium', 'mb-6')} ref={ref} id={id}>{title}</h2>
      <ul className={clsx(styles.elements, 'mb-10')}>
        {array.map((burger, index) => (
          (burger.type === type) && 
          <Link to={{ pathname: `/ingredients/${burger._id}`, state: { background: location } }} key={index} className={styles.link}>
            <BurgerElement 
              key={index}
              item={burger}
//              renderModal={renderModal}
            />
            </Link>
          ))
        }
      </ul> 
    </>
  )
});

export default BurgerIngredientsSecton;