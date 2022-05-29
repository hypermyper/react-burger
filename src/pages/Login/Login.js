import React, { useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { Redirect, Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { login } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
	const [state, setState] = useState({
		login: '',
		password: ''
	})

	const userName = useSelector(store => store.auth.name);

  const dispatch = useDispatch();

	const inputRef = useRef(null)

	const handleInputChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	}

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const submit = (e) => {
    e.preventDefault();
    dispatch(login(state));
  };

  if (userName || localStorage.getItem('refreshToken')) {
    return (
      <Redirect to={ state?.from || '/' } />
    );
  }

	return (
		<div className={styles.container}>
			<form onSubmit={submit} className={clsx(styles.form, 'mb-20')}>
				<h1 className={clsx(styles.title, 'text', 'text_type_main-medium')}>Вход</h1>
				<Input
					type={'text'}
					placeholder={'E-mail'}
					onChange={handleInputChange}
					value={state.login}
					name={'login'}
					error={false}
					ref={inputRef}
					errorText={'Ошибка'}
					size={'default'}
					onIconClick={onIconClick}
				/>
				<PasswordInput
					value={state.password}
					name={'password'}
					onChange={handleInputChange}
				/>
				<Button type="primary" size="medium">
					Войти
				</Button>

			</form>
			<div className={clsx('mb-4')}>
				<span className={clsx('text', 'text_type_main-default', 'text_color_inactive')}>Вы – новый пользователь?</span>
				<Link to='/register' className={clsx('text', 'text_type_main-default', styles.link, 'pl-2')}>Зарегистрироваться</Link>
			</div>
			<div>
				<span className={clsx('text', 'text_type_main-default', 'text_color_inactive')}>Забыли пароль?</span>
				<Link to='/forgot-password' className={clsx('text', 'text_type_main-default', styles.link, 'pl-2')}>Восстановить пароль</Link>
			</div>
		</div >
	);
}


export default Login;