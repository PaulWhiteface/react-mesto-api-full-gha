import React from 'react';

function InfoTooltip({onClose, isOpen, name, isSuccess}) {
  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_active" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <div className={`popup__success ${isSuccess ? "popup__success_type_green" : "popup__success_type_red"}`}></div>
        <h2 className="popup__success-title">{isSuccess ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте еще раз"}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;