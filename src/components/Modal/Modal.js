import React, { useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './modal.module.css';
import { ModalContext } from '../../utils/appContext';

const modalRoot = document.getElementById("react-modals");

function Modal({ children }) {

	const { setModal } = useContext(ModalContext);

	const onCloseEsc = (e) => {
		if (e.key === "Escape")
			onClose();
	}

	const onClose = () => {
		setModal({
			isVisible: false,
			content: null,
		})
	}

	useEffect(() => {
		window.addEventListener('keydown', onCloseEsc)
		return () => {
			window.removeEventListener('keydown', onCloseEsc)
		}
	})

	return ReactDOM.createPortal((
		<>
			<div className={clsx(styles.modal, 'pr-10', 'pl-10', 'pt-10', 'pb-15')}>
				<span className={clsx(styles.button_close)} onClick={onClose}>
					<CloseIcon type="primary" />
				</span>
				<div>
					{children}
				</div>

			</div>
			<ModalOverlay onClose={onClose} />
		</>
	),
  modalRoot
	);
}

Modal.propTypes = {
	children: PropTypes.element
}

export default Modal;