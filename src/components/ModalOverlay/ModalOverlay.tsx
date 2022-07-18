import React, { FC } from 'react';
import styles from './modaloverlay.module.css';
import { TProps } from './types';

const  ModalOverlay: FC<TProps> = ({ onClose }) => { 
  return (
    <div className={styles.modaloverlay} onClick={onClose} />
  )
}

export default ModalOverlay;