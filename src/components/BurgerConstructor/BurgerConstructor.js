import React, { useContext } from 'react';
import clsx from 'clsx';
import { API_URL } from '../../utils/constants';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burgerconstructor.module.css';
import { BurgerContext, ModalContext } from '../../utils/appContext';

function BurgerConstructor() {

  const { state, setState } = useContext(BurgerContext);
  const { setModal } = useContext(ModalContext);

  const createOrder = async (ingredients) => {
    const res = await fetch(`${API_URL}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        { ingredients }
      ),
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(res.status);
  }  

  const priceTotal = () => {
    const bunIngredientsPrice = 2 * 2215;
    const burgerIngredientsPrice = state.burgerIngredients.filter(el => el.type != 'bun');
      return burgerIngredientsPrice.reduce((acc, curr) => acc += curr.price, bunIngredientsPrice);
  }

  const handleDeleteIngredient = (item) => {
    setState({...state, 
      burgerIngredients: [...state.burgerIngredients.filter(el => el._id != item)]
    }); 
      console.log(state.burgerIngredients);
  }

	const handleOpenModal = () => {
    createOrder(state.burgerIngredients.map(el => el._id))
      .then((data) => {
        setModal({
          visible: true,
          content: <OrderDetails orderNumber={data.order.number}/>
        })
      })

	}  

  return (
    <section className={clsx(styles.section, 'pt-25', 'pl-4')}>
      <div className={clsx('pl-8', styles.bun_section)}>
        {state.burgerIngredients.map((burger, index) => (
            (burger.type == 'bun') && (index == 0) && <ConstructorElement 
              type="top"
              isLocked={true}
              text={burger.name + ' (верх)'}
              thumbnail={burger.image}
              price={burger.price}
              key={burger._id}
            />
          ))}        
      </div>
      <ul className={clsx(styles.content, 'mt-4', 'mb-4')}>
        {state.burgerIngredients.map((burger) => (
          (burger.type != 'bun') && 
          <li className={clsx(styles.content_list)} key={burger._id}>
            <DragIcon type="primary" />
            <ConstructorElement 
              text={burger.name}
              thumbnail={burger.image}
              price={burger.price}
              handleClose={() => handleDeleteIngredient(burger._id)}
            />
          </li>
        ))}
      </ul>    
      <div className={clsx('pl-8', styles.bun_section)}>
        {state.burgerIngredients.map((burger, index) => (
            (burger.type == 'bun') && (index == 0) && <ConstructorElement 
              type="bottom"
              isLocked={true}
              text={burger.name + ' (низ)'}
              thumbnail={burger.image}
              price={burger.price}
              key={burger._id}
            />
          ))}   
      </div>  
      <div className={clsx(styles.total, 'pt-10')}>
        <span className={clsx(styles.price, 'mr-10', 'text_type_digits-medium')}>{priceTotal()} <CurrencyIcon type="primary" /></span>
        <Button type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>     
    </section>
  )
}

export default BurgerConstructor;