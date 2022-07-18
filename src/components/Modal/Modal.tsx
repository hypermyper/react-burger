import React, { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { useHistory } from "react-router-dom";
import styles from './modal.module.css';

const modalRoot: Element | null = document.getElementById("react-modals");

const Modal: FC = ({ children }) => {

	const history = useHistory();

	const onCloseEsc = (e: KeyboardEvent) => {
		if (e.key === "Escape")
			onClose();
	};

  const onClose = () => {
    history.goBack();
  };	

	useEffect(() => {
		window.addEventListener('keydown', onCloseEsc)
		return () => {
			window.removeEventListener('keydown', onCloseEsc)
		}
	});

	return modalRoot && ReactDOM.createPortal((
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

export default Modal;