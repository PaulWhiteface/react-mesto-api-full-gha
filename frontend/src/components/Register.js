import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import '../index.css';


function Register ({onRegistration, loggedIn}) {
  const [email, setEmail] = React.useState('');       // Собираем данные с инпутов
  const [password, setPassword] = React.useState(''); // в эти стейт переменные

  if(loggedIn) {
    return <Navigate to="/" replace />
  }

  function submitRegistration (e) {
    e.preventDefault();
    onRegistration(email, password)
  }

  function handleChangeEmail (e) {
    setEmail(e.target.value);
  }

  function handleChangePassword (e) {
    setPassword(e.target.value);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={submitRegistration} className="auth__form" >
        <input value={email} onChange={handleChangeEmail} className="auth__input" name="email" type="email" placeholder='Email'></input>
        <input value={password} onChange={handleChangePassword} className="auth__input" name="password" type="password"placeholder='Пароль'></input>
        <button className="auth__button">Зарегистрироваться</button>
      </form>
      <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
    </div>
  )
}

export default Register;