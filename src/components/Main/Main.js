import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './main.module.css';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';

const dataPropTypes = PropTypes.shape({
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired
});

function Main({ data }) {
  return (
    <main className={clsx('pl-10 pr-10', styles.main)}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </main>
  );
}

Main.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default Main;
