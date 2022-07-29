import React, { useState, useRef, SyntheticEvent, useEffect } from 'react';
import clsx from 'clsx';
import { Link, Redirect } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';
import styles from './forgotpassword.module.css';

function ForgotPassword() {
	const [value, setValue] = useState('');
	const inputRef = useRef(null);
	
	const [errorEmail, setErrorEmail] = useState(false);
	const [errorEmailText, setErrorEmailText] = useState('');

  const dispatch = useDispatch();	

	const onChangeEmail = (e: SyntheticEvent<HTMLInputElement>): void => {
		const target = e.target as HTMLInputElement;
		const value = target.value; 
		setValue(value);
		setErrorEmail(false);
		setErrorEmailText('');
	}

	const submit = (e: SyntheticEvent) => {
		e.preventDefault();
    if (value != '') {
			dispatch(forgotPassword(value));
    } else {
      console.log('Пустой email');
			setErrorEmail(true);
			setErrorEmailText('Пустой email');
    }
	};

  useEffect(() => {
    document.title = 'Восстановление пароля';
  });  	

  if (localStorage.getItem('refreshToken')) {
    return (
      <Redirect to={{ pathname: '/' }} />
    );
  }	

	return (
		<div className={styles.container}>
			<form onSubmit={submit} className={clsx(styles.form, 'mb-20')}>
				<h1 className={clsx(styles.title, 'text', 'text_type_main-medium')}>Восстановление пароля</h1>
				<Input
					type={'email'}
					placeholder={'Укажите e-mail'}
					onChange={onChangeEmail}
					value={value}
					name={'email'}
					error={errorEmail}
					ref={inputRef}
					errorText={errorEmailText}
					size={'default'}
				/>
				<Button type="primary" size="medium">
					Восстановить
				</Button>
			</form>
			<div className={clsx('mb-4')}>
				<span className={clsx('text', 'text_type_main-default', 'text_color_inactive')}>Вспомнили пароль?</span>
				<Link to='/login' className={clsx('text', 'text_type_main-default', 'pl-2', styles.link)}>Войти</Link>
			</div>
		</div>
	);
}

export default ForgotPassword;