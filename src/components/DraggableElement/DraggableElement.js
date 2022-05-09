import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './draggableelement.module.css';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

function DraggableElement({ item, index, handleDeleteIngredient, moveElement }) {
	const id = item._id
	const ref = useRef(null);
	const [, drop] = useDrop({
		accept: 'item',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}

			moveElement(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

  const [{ isDragging }, drag] = useDrag({
		type: 'item',
		item: () => {
			return { id, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	return (
    <li className={clsx(styles.content_list)} key={index} ref={ref} style={{ opacity }}>
    <DragIcon type="primary" />
    <ConstructorElement 
      text={item.name}
      thumbnail={item.image}
      price={item.price}
      handleClose={() => handleDeleteIngredient(item)}
    />
  </li> 
	)
}

DraggableElement.propTypes = {
	item: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
	}).isRequired,
	index: PropTypes.number.isRequired,
	handleDeleteIngredient: PropTypes.func.isRequired,
	moveElement: PropTypes.func.isRequired,
}

export default DraggableElement;