import React, { useContext } from 'react';
import clsx from 'clsx';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgeringredients.module.css';
import BurgerIngredientsSecton from '../../components/BurgerIngredientsSecton/BurgerIngredientsSection';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { ModalContext } from '../../utils/appContext';

function BurgerIngredients() {

  const { setModal } = useContext(ModalContext);

  const handleOpenModal = (element) => {
    setModal({
      visible: true,
      content: <IngredientDetails
        name={element.name}
        image={element.image_large}              
        calories={element.calories}
        proteins={element.proteins}        
        fat={element.fat}        
        carbohydrates={element.carbohydrates}              
      />
    });
  }

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
          title="Булки" 
          type="bun"
          handleOpenModal={handleOpenModal}
        />
        <BurgerIngredientsSecton 
          title="Соусы" 
          type="sauce" 
          handleOpenModal={handleOpenModal}          
        />
        <BurgerIngredientsSecton 
          title="Начинки" 
          type="main" 
          handleOpenModal={handleOpenModal}          
        />
      </section>              
    </section>
  )
}

export default BurgerIngredients;