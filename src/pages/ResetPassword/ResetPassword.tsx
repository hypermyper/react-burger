import React, { useState, SyntheticEvent } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPasswordRequest } from '../../utils/api';
import { resetPassword } from '../../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './resetpassword.module.css';

function ResetPassword() {
	const [state, setState] = useState({
		password: '',
		token: '',
	})

	const handleInputChange = (e: SyntheticEvent) => {
		console.log(state);
		const target = e.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;
		setState({
			...state,
			[name]: value
		});
	}

  const dispatch = useDispatch();

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPassword(state));
    resetPasswordRequest(state)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isforgotPasswordSuccess = useSelector((store: any) => store.auth.isforgotPasswordSuccess);

  if (localStorage.getItem('refreshToken')) {
    return (
      <Redirect to={{ pathname: '/' }} />
    );
  }	

  if (!localStorage.getItem('refreshToken') && !isforgotPasswordSuccess) {
    return (
      <Redirect to={{ pathname: '/forgot-password' }} />
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