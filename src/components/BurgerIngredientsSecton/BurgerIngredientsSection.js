import React, { useContext } from 'react';
import clsx from 'clsx';
import styles from './burgeringredientssection.module.css';
import PropTypes from 'prop-types';
import BurgerElement from '../../components/BurgerElement/BurgerElement';
import { BurgerContext } from '../../utils/appContext';

function BurgerIngredientsSecton(props) {

  const { state } = useContext(BurgerContext);

  return (
    <>
      <h2 className={clsx('text', 'text_type_main-medium', 'mb-6')}>{props.title}</h2>
      <ul className={clsx(styles.elements, 'mb-10')}>
        {state.data.map((burger, index) => (
          (burger.type == props.type) && 
          <BurgerElement 
            key={index}
            element={burger}
            handleOpenModal={props.handleOpenModal}
          />
        ))}
      </ul> 
    </>
  )
}

BurgerIngredientsSecton.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleOpenModal: PropTypes.func.isRequired
}

export default BurgerIngredientsSecton;