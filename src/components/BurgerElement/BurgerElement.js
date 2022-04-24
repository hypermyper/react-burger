import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './burgerelement.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerElement(props) {

	const handleClick = () => {
    props.handleOpenModal(props.element);
	}

  return (
    <li className={clsx(styles.element, 'pl-4', 'pr-2')} onClick={handleClick}>
      <img src={props.element.image} alt={props.element.name} />
      <span className={clsx(styles.price, 'text', 'text_type_digits-default', 'pt-2', 'pb-2')}>{props.element.price} <CurrencyIcon type="primary" /></span>
      <p className={clsx('text', 'text_type_main-default')}>{props.element.name}</p>
    </li>
  )
}

BurgerElement.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
  element: PropTypes.shape({
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
	}).isRequired
}

export default BurgerElement;