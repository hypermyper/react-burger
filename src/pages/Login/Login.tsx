import React, { useState, useRef, SyntheticEvent } from 'react';
import clsx from 'clsx';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { login } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { TLocationTemplate } from '../../types';

function Login() {
	const [state, setState] = useState({
		login: '',
		password: ''
	})

	const userName = useSelector( (store: any) => store.auth.name);

  const dispatch = useDispatch();
	const location = useLocation<TLocationTemplate>();

	const inputRef = useRef(null);

	const handleInputChange = (e: SyntheticEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;  
		setState({
			...state,
			[name]: value
		});
	}

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login(state));
  };

  if (userName) {
    const { from } = location.state || { from: { pathname: '/' } };
    return (
      <Redirect
        to={from}
      />
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