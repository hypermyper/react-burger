import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './burgeringredientssection.module.css';
import PropTypes from 'prop-types';
import BurgerElement from '../../components/BurgerElement/BurgerElement';

const BurgerIngredientsSecton = forwardRef(({ title, array, type, renderModal, id }, ref) => {

  return (
    <>
      <h2 className={clsx('text', 'text_type_main-medium', 'mb-6')} ref={ref} id={id}>{title}</h2>
      <ul className={clsx(styles.elements, 'mb-10')}>
        {array.map((burger, index) => (
          (burger.type == type) && 
            <BurgerElement 
              key={index}
              item={burger}
              renderModal={renderModal}
            />
          ))
        }
      </ul> 
    </>
  )
});

BurgerIngredientsSecton.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  renderModal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

export default BurgerIngredientsSecton;