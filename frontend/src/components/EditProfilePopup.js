import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentuserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
const [name, setName] = React.useState('');

const [description, setDescription] = React.useState('');

const user = React.useContext(CurrentUserContext);

React.useEffect(() => {
  setName(user.name);
  setDescription(user.about);
}, [user, isOpen])

function handleSubmit(e) {
  e.preventDefault();

  onUpdateUser({
    name,
    about: description,
  });
}

function handleChangeName(e) {
  setName(e.target.value);
}

function handleChangeDescription(e) {
  setDescription(e.target.value)
}

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} buttonText={"Сохранить"} onSubmit={handleSubmit}>
      <input value={name || ''} onChange={handleChangeName} className="popup__input popup__input-profile popup__input_text_name" type="text" name="nickname" placeholder="Имя" minLength="2" maxLength="40" required />
      <span className="popup__error" id="nickname-error"></span>
      <input value={description || ''} onChange={handleChangeDescription} className="popup__input popup__input-profile popup__input_text_job" type="text" name="job" placeholder="Ваша деятельность" minLength="2" maxLength="200" required />
      <span className="popup__error" id="job-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;