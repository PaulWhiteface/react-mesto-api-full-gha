import React from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import logo from '../images/header__logo.svg';

function Header({headerEmail, onOut}) {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <Routes>
        <Route path="/sign-in" element={<Link className="header__link" to="/sign-up">Регистрация</Link>}></Route>
        <Route path="/sign-up" element={<Link className="header__link" to="/sign-in">Войти</Link>}></Route>
        <Route path="/" element={
          <div className="header__container">
            <p className="header__email">{headerEmail}</p>
            <Link onClick={onOut} to="/sign-in" className="header__sign-out">Выйти</Link>
          </div>
        } />
      </Routes>
    </header>
  )
}

export default Header;