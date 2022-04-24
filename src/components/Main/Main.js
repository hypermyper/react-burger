import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './main.module.css';
import Modal from '../../components/Modal/Modal';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import dataPropTypes from '../../utils/types';

function Main({ data }) {

  const [modal, setModal] = React.useState({
		visible: false,
		content: null
	});

  const { visible, content } = modal;  

  return (
    <main className={clsx('pl-10 pr-10', styles.main)}>
      <BurgerIngredients data={data} setModal={setModal} />
      <BurgerConstructor data={data} setModal={setModal} />
      {visible && <Modal setModal={setModal}>{content}</Modal>}
    </main>
  );
}

Main.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default Main;
