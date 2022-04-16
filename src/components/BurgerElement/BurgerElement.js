import clsx from 'clsx';
import styles from './burgerelement.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerElement(props) {
  return (
    <li className={clsx(styles.element, 'pl-4', 'pr-2')}>
      <img src={props.thumbnail} />
      <span className={clsx(styles.price, 'text', 'text_type_digits-default', 'pt-2', 'pb-2')}>{props.price} <CurrencyIcon type="primary" /></span>
      <p className={clsx('text', 'text_type_main-default')}>{props.text}</p>
    </li>
  )
}

export default BurgerElement;