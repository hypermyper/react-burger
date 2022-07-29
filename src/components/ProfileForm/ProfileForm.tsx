import React, { useState, useEffect, SyntheticEvent } from 'react';
import clsx from 'clsx';
import styles from './profileform.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../services/actions/auth';
import Loader from '../Loader/Loader';

function ProfileForm() {
  const currentUserName = useSelector((store: any) => store.auth.name);
  const currentUserEmail = useSelector((store: any) => store.auth.email);
  const { updateUserRequest } = useSelector((store: any) => store.auth)
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    nameDisabled: true,
    emailDisabled: true,
    passwordDisabled: true,
  });

  useEffect(() => {
    setState((state) => {
      return {
        ...state,
        name: currentUserName,
        email: currentUserEmail,
      };
    });
  }, [currentUserName, currentUserEmail]);

  const handleInputChange = (e: SyntheticEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;    
    setState({
      ...state,
      [name]: value,
    });
  };

  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);

  const activeNameInput = () => {
    setState({
      ...state,
      nameDisabled: state.nameDisabled ? false : true,
    });
    if (nameInputRef && nameInputRef.current) {
      nameInputRef.current.disabled = false;
    }
    setTimeout(() => nameInputRef && nameInputRef.current && nameInputRef.current.focus(), 0);
  };

  const activeEmailInput = () => {
    setState({
      ...state,
      emailDisabled: state.emailDisabled ? false : true,
    });
    if (emailInputRef && emailInputRef.current) {    
      emailInputRef.current.disabled = false;
    }
    setTimeout(() => emailInputRef && emailInputRef.current && emailInputRef.current.focus(), 0);
  };

  const activePasswordInput = () => {
    setState({
      ...state,
      passwordDisabled: state.passwordDisabled ? false : true,
    });
    if (passwordInputRef && passwordInputRef.current) {
      passwordInputRef.current.disabled = false;
    }
    setTimeout(() => passwordInputRef && passwordInputRef.current && passwordInputRef.current.focus(), 0);
  };

  const iconNameInput = state.nameDisabled ? 'EditIcon' : 'CloseIcon';
  const emailNameInput = state.emailDisabled ? 'EditIcon' : 'CloseIcon';
  const passwordNameInput = state.passwordDisabled ? 'EditIcon' : 'CloseIcon';

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    let data = {};
    data = state.name !== currentUserName ? { ...data, name: state.name } : data;
    data = state.email !== currentUserEmail ? { ...data, email: state.email } : data;
    data = state.password.length !== 0 ? { ...data, password: state.password } : data;

    dispatch(updateUser({ ...data }));
    
    setState({
      ...state,
      password: '',
      nameDisabled: true,
      emailDisabled: true,
      passwordDisabled: true,
    });
  };

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setState({
      ...state,
      name: currentUserName,
      email: currentUserEmail,
      password: '',
      nameDisabled: true,
      emailDisabled: true,
      passwordDisabled: true,
    });
  };

  useEffect(() => {
    document.title = 'Профиль / Личный кабинет';
  });    

  if (updateUserRequest) {
    return (<Loader />)
  }

  return (
    <form onSubmit={onSubmit} className={clsx(styles.form)}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleInputChange}
        icon={iconNameInput}
        value={state.name}
        name={'name'}
        error={false}
        ref={nameInputRef}
        onIconClick={activeNameInput}
        errorText={'Ошибка'}
        size={'default'}
        disabled={state.nameDisabled}
      />
      <Input
        type={'email'}
        placeholder={'Логин'}
        onChange={handleInputChange}
        icon={emailNameInput}
        value={state.email}
        name={'email'}
        error={false}
        ref={emailInputRef}
        onIconClick={activeEmailInput}
        errorText={'Ошибка'}
        size={'default'}
        disabled={state.emailDisabled}
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        onChange={handleInputChange}
        icon={passwordNameInput}
        value={state.password}
        name={'password'}
        error={false}
        ref={passwordInputRef}
        onIconClick={activePasswordInput}
        errorText={'Ошибка'}
        size={'default'}
        disabled={state.passwordDisabled}
      />
      {state.name !== currentUserName || state.email !== currentUserEmail || state.password.length !== 0 ? (
        <div className={styles.buttons}>
          <Button type='secondary' size='medium' onClick={handleClick}>
            Отмена
          </Button>
          <Button type='primary' size='medium'>
            Сохранить
          </Button>
        </div>
      ) : null}
    </form>
  );
}

export default ProfileForm;