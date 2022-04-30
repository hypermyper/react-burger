import React, { useContext } from 'react';
import clsx from 'clsx';
import styles from './main.module.css';
import Modal from '../../components/Modal/Modal';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import { ModalContext } from '../../utils/appContext';

function Main() {

  const [modal, setModal] = React.useState({
		visible: false,
		content: null
	});

  const { visible, content } = modal;  

  return (
    <main className={clsx('pl-10 pr-10', styles.main)}>
      <ModalContext.Provider value={{ modal, setModal }}>
        <BurgerIngredients />
        <BurgerConstructor />
        {visible && <Modal>{content}</Modal>}
      </ModalContext.Provider>
    </main>
  );
}

export default Main;
