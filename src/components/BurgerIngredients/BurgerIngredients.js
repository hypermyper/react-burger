import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgeringredients.module.css';
import BurgerIngredientsSecton from '../../components/BurgerIngredientsSecton/BurgerIngredientsSection';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import Modal from '../../components/Modal/Modal';

import { useSelector, useDispatch } from 'react-redux';
import { CURRENT_BURGER } from '../../services/actions/ingredients';
import { OPEN_MODAL, CLOSE_MODAL } from '../../services/actions/modal';

function BurgerIngredients() {

  const dispatch = useDispatch();
  const { bun, sauce, main } = useSelector(store => store.ingredients.data);
  const { currentBurger } = useSelector(store => store.ingredients);
  const { content, visible } = useSelector(store => store.modal);

  const rootRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const [current, setCurrent] = useState('bunIngredients');

	const handleOnScroll = () => {
		const bunHeight = Math.abs(rootRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
		const sauceHeight = Math.abs(rootRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
		const mainHeight = Math.abs(rootRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
		const minHeight = Math.min(bunHeight, sauceHeight, mainHeight);
		const currentHeader = minHeight === bunHeight ? 'bunIngredients' : minHeight === sauceHeight ? 'sauceIngredients' : 'mainIngredients';
		setCurrent(prevState => (currentHeader === prevState.current ? prevState.current : currentHeader));
	}  

  const renderModal = (item) => {
    dispatch({
      type: CURRENT_BURGER,
      item
    })
    dispatch({
      type: OPEN_MODAL,
      content: <IngredientDetails />
    })
  }  

  const onClose = () => {
		dispatch({
			type: CLOSE_MODAL
		})
	}

  const scrollIntoBun = () => {
    bunRef.current.scrollIntoView({behavior: 'smooth'});
  }

  const scrollIntoSauce = () => {
    sauceRef.current.scrollIntoView({behavior: 'smooth'});
  }

  const scrollIntoMain = () => {
    mainRef.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <section className={clsx(styles.section, 'pt-10')}>
      <h1 className={clsx('text', 'text_type_main-large', 'pb-5')}>Соберите бургер</h1>
      <div className={clsx(styles.tab, 'mb-10')}>
        <Tab 
          value="bunIngredients" 
          active={current === 'bunIngredients'} 
          onClick={scrollIntoBun}
          >
            Булки
        </Tab>
        <Tab 
          value="sauceIngredients" 
          active={current === 'sauceIngredients'} 
          onClick={scrollIntoSauce}
          >
            Соусы
        </Tab>
        <Tab 
          value="mainIngredients" 
          active={current === 'mainIngredients'} 
          onClick={scrollIntoMain}
          >
            Начинки
        </Tab>
      </div>
      <section className={clsx(styles.content, 'mb-4')} ref={rootRef} onScroll={handleOnScroll}>
        <BurgerIngredientsSecton 
          title="Булки" 
          type="bun"
          array={bun} 
          id="bunIngredients" 
          renderModal={renderModal} 
          ref={bunRef} 
        />
        <BurgerIngredientsSecton 
          title="Соусы" 
          type="sauce"  
          array={sauce}  
          id="sauceIngredients" 
          renderModal={renderModal}                   
          ref={sauceRef}                
        />
        <BurgerIngredientsSecton 
          title="Начинки" 
          type="main"
          array={main}   
          id="mainIngredients"  
          renderModal={renderModal}                 
          ref={mainRef}       
        />
      </section>   
      {currentBurger && visible && <Modal onClose={onClose}>{content}</Modal>}           
    </section>
  )
}

export default BurgerIngredients;