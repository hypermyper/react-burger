import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './profileorders.module.css';
import { Link, useLocation } from 'react-router-dom';
import OrdersItem from '../OrdersItem/OrdersItem';
import { useDispatch, useSelector } from '../../utils/hooks';
import { WS_CONNECTION_START_AUTH, WS_CONNECTION_CLOSE_AUTH } from '../../utils/constants';
import { TOrder } from '../../types';

function ProfileOrders() {
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(
		() => {
			dispatch({ type: WS_CONNECTION_START_AUTH });
			return () => {
				dispatch({ type: WS_CONNECTION_CLOSE_AUTH })
				return;
			}
		},
		[dispatch]
	);

	const { orders } = useSelector((store) => store.wsAuth);
	return (
		<ul className={clsx(styles.list, 'mb-20')}>
			{orders?.map((el: TOrder, i: number) => (
				<li className={clsx(styles['list-item'])} key={i}>
					<Link
						to={{
							pathname: `/profile/orders/${el.number}`,
							state: { background: location }
						}}
						className={styles['burger-link']}
					>
						<OrdersItem
							number={el.number}
							name={el.name}
							ingredients={el.ingredients}
							createdAt={el.createdAt}
							status={el.status}
						/>
					</Link>
				</li>
			))
			}
		</ul>
	);
}

export default ProfileOrders;
