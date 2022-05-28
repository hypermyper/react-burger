import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './burgeringredientssection.module.css';
import PropTypes from 'prop-types';
import BurgerElement from '../../components/BurgerElement/BurgerElement';
import { Link, useLocation } from "react-router-dom";

const BurgerIngredientsSecton = forwardRef(({ title, array, type, renderModal, id }, ref) => {

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
              renderModal={renderModal}
            />
            </Link>
          ))
        }
      </ul> 
    </>
  )
});

BurgerIngredientsSecton.propTypes = {
  title: PropTypes.string.isRequired,
	array: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
    }).isRequired),  
  type: PropTypes.string.isRequired,
  renderModal: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

export default BurgerIngredientsSecton;