import React from 'react';
import clsx from 'clsx';
import styles from './orderdetails.module.css';
import orderDetailsIcon from '../../images/orderDetailsIcon.svg';
import { useSelector } from '../../utils/hooks';
import Loader from '../Loader/Loader';

const OrderDetails = () => {

  const { currentOrder, orderRequest } = useSelector( (store) => store.ingredients);	

	return (
		<div className={clsx(styles.order, 'p-15')}>
			{orderRequest && <Loader />}
			{!orderRequest &&
				<>
					<h3 className={clsx(styles.order_number, 'text', 'text_type_digits-large', 'mb-8')}>{currentOrder?.order.number}</h3>
					<p className={clsx(styles.order__text, 'text', 'text_type_main-medium', 'pb-15')} >идентификатор заказа</p>
					<img src={orderDetailsIcon} alt="Ваш заказ начали готовить" />
					<p className={clsx(styles.order__text, 'text', 'text_type_main-default', 'mb-2', 'pt-15')} >Ваш заказ начали готовить</p>
					<p className={clsx(styles.order__text, 'text', 'text_type_main-default', 'text_color_inactive')} >Дождитесь готовности на орбитальной станции</p>
				</>
			}
		</div>
	);
}

export default OrderDetails;