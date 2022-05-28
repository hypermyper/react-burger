import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { Redirect, Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { register } from '../../services/actions/auth';

import styles from './register.module.css';

function Register() {
	const [state, setState] = useState({
		name: '',
		email: '',
		password: '',
	});

  const dispatch = useDispatch();	

	const handleInputChange = e => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	}

	const onIconClick = useCallback(() => {
		alert('Icon Click Callback')
	}, [])

  const submit = e => {
    e.preventDefault();
    dispatch(register(state));
  };

  if (localStorage.getItem('refreshToken')) {
    return (
      <Redirect to={{ pathname: '/' }} />
    );
  }	

	return (
		<div className={styles.container}>
			<form onSubmit={submit} className={clsx(styles.form, 'mb-20')}>
				<h1 className={clsx(styles.title, 'text', 'text_type_main-medium')}>Регистрация</h1>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={handleInputChange}
					value={state.name}
					name={'name'}
					error={false}
					onIconClick={onIconClick}
					errorText={'Ошибка'}
					size={'default'}
				/>
				<Input
					type={'text'}
					placeholder={'E-mail'}
					onChange={handleInputChange}
					value={state.email}
					name={'email'}
					error={false}
					onIconClick={onIconClick}
					errorText={'Ошибка'}
					size={'default'}
				/>
				<PasswordInput
					value={state.password}
					name={'password'}
					onChange={handleInputChange}
				/>
				<Button type="primary" size="medium">
					Зарегистрироваться
				</Button>

			</form>
			<div className={clsx('mb-4')}>
				<span className={clsx('text', 'text_type_main-default', 'text_color_inactive')}>Уже зарегистрированы?</span>
				<Link to='/login' className={clsx('text', 'text_type_main-default', styles.link, 'pl-2')}>Войти</Link>
			</div>
		</div >


	);
}

export default Register;