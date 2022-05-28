import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../utils/api';
import { Redirect } from 'react-router-dom';
import styles from './resetpassword.module.css';

function ResetPassword() {
	const [state, setState] = useState({
		password: '',
		token: '',
	})

	const handleInputChange = (e) => {
		console.log(state);
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	}
	const inputRef = React.useRef(null)
	const onIconClick = useCallback(() => {
		setTimeout(() => inputRef.current.focus(), 0)
		alert('Icon Click Callback')
	}, [])

	const submit = e => {
		e.preventDefault();
		console.log(state);

		resetPassword(state).then((res) => {
			console.log(res)
		}).catch(err => {
			console.log(err)
		})
	};

  if (localStorage.getItem('refreshToken')) {
    return (
      <Redirect to={{ pathname: '/' }} />
    );
  }	

	return (
		<div className={styles.container}>
			<form onSubmit={submit} className={clsx(styles.form, 'mb-20')}>
				<h1 className={clsx(styles.title, 'text', 'text_type_main-medium')}>Восстановление пароля</h1>
				<PasswordInput
					value={state.password}
					name={'password'}
					onChange={handleInputChange}
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={handleInputChange}
					value={state.token}
					name={'token'}
					error={false}
					ref={inputRef}
					onIconClick={onIconClick}
					errorText={'Ошибка'}
					size={'default'}
				/>
				<Button type="primary" size="medium">
					Сохранить
				</Button>

			</form>
			<div className={clsx('mb-4')}>
				<span className={clsx('text', 'text_type_main-default', 'text_color_inactive')}>Вспомнили пароль?</span>
				<Link to='/login' className={clsx('text', 'text_type_main-default', 'pl-2', styles.link)}>Войти</Link>
			</div>

		</div >


	);
}

export default ResetPassword;