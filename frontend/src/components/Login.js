import React from 'react';
import '../index.css';
import { Navigate } from 'react-router-dom';


function Login ({onLogIn, loggedIn}) {
  const [email, setEmail] = React.useState('');       // Собираем данные с инпутов
  const [password, setPassword] = React.useState(''); // в эти стейт переменные

  if(loggedIn) {
    return <Navigate to="/" replace />
  }

  function submitLogIn (e) {
    e.preventDefault();
    onLogIn(email, password)
  }

  function handleChangeEmail (e) {
    setEmail(e.target.value);
  }

  function handleChangePassword (e) {
    setPassword(e.target.value);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form onSubmit={submitLogIn} className="auth__form" >
        <input value={email} onChange={handleChangeEmail} className="auth__input" name="email" type="email" placeholder='Email'></input>
        <input value={password} onChange={handleChangePassword} className="auth__input" name="password" type="password"placeholder='Пароль'></input>
        <button className="auth__button">Войти</button>
      </form>
    </div>
  )
}

export default Login;