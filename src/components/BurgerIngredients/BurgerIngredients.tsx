import React, { useState, FC, useRef } from 'react';
import clsx from 'clsx';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgeringredients.module.css';
import BurgerIngredientsSecton from '../BurgerIngredientsSecton/BurgerIngredientsSection';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';

import { useSelector, useDispatch } from 'react-redux';
import { CURRENT_BURGER } from '../../services/actions/ingredients';
import { OPEN_MODAL } from '../../services/actions/modal';
import { TIngredient } from '../../types';

const BurgerIngredients: FC = () => {

const filterArray = (arr: Array<TIngredient>) => {
	return arr.reduce((acc: any, curr: any) =>
	({
		...acc, [curr.type]: [...acc[curr.type] || [], curr]
	}), {})
}  

  const dispatch = useDispatch();

  const { data } = useSelector( (store: any) => store.ingredients);
  const { currentBurger } = useSelector( (store: any) => store.ingredients);
  //  const { bun, sauce, main } = useSelector(store => store.ingredients.data);
  const { bun, sauce, main } = filterArray(data);
  const { content, visible } = useSelector( (store: any) => store.modal);

  const rootRef = useRef<HTMLElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  const [current, setCurrent] = useState<string>('bunIngredients');

	const handleOnScroll = () => {
    if (rootRef && bunRef && sauceRef && mainRef && rootRef.current && bunRef.current && sauceRef.current && mainRef.current) {    
      const bunHeight = Math.abs(rootRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top)
      const sauceHeight = Math.abs(rootRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
      const mainHeight = Math.abs(rootRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
      const minHeight = Math.min(bunHeight, sauceHeight, mainHeight);
      const currentHeader = minHeight === bunHeight ? 'bunIngredients' : minHeight === sauceHeight ? 'sauceIngredients' : 'mainIngredients';
      setCurrent(prevState => (currentHeader === prevState ? prevState : currentHeader));
    }
	}  

  const renderModal = (item: TIngredient) => {
    dispatch({
      type: CURRENT_BURGER,
      item
    })
    dispatch({
      type: OPEN_MODAL,
      content: <IngredientDetails />
    })
  }  

/*   const onClose = () => {
		dispatch({
			type: CLOSE_MODAL
		})
	} */

  const scrollIntoBun = () => {
    if (bunRef && bunRef.current) {      
      bunRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }

  const scrollIntoSauce = () => {
    if (sauceRef && sauceRef.current) {         
      sauceRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }

  const scrollIntoMain = () => {
    if (mainRef && mainRef.current) {      
      mainRef.current.scrollIntoView({behavior: 'smooth'});
    }
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
      {currentBurger && visible && <Modal>{content}</Modal>}           
    </section>
  )
}

export default BurgerIngredients;