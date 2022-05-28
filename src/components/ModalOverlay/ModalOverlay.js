import React from 'react';
import styles from './modaloverlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ onClose }) { 
  return (
    <div className={styles.modaloverlay} onClick={onClose} />
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func
}

export default ModalOverlay;