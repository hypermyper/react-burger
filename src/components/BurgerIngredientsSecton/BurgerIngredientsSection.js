import clsx from 'clsx';
import styles from './burgeringredientssection.module.css';
import BurgerElement from '../../components/BurgerElement/BurgerElement';

function BurgerIngredientsSecton(props) {
  return (
    <>
      <h2 className={clsx('text', 'text_type_main-medium', 'mb-6')}>{props.title}</h2>
      <ul className={clsx(styles.elements, 'mb-10')}>
        {props.data.map((burger, index) => (
          (burger.type == props.type) && <BurgerElement 
            key={index}
            text={burger.name}
            thumbnail={burger.image}
            price={burger.price}
          />
        ))}
      </ul> 
    </>
  )
}

export default BurgerIngredientsSecton;