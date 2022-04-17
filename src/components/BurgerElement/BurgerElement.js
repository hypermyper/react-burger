import clsx from 'clsx';
import PropTypes from 'prop-types';
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

BurgerElement.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
}

export default BurgerElement;