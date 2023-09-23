import React from 'react';


function PopupWithForm({title, name, children, isOpen, onClose, buttonText, onSubmit}) {
  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_active" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__head">{title}</h2>
        <button className="popup__close" type="button" onClick={onClose}></button>
        <form onSubmit={onSubmit} className={`popup__form popup__form-${name}`} name={`form-${name}`} noValidate>
          {children}
          <button className={`popup__button popup__button-${name}`} type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;