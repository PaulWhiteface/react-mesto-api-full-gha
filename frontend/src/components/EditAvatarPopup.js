import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef();  // привязываем переменную к конкретному инпуту

  function handleChangeAvatar(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,  // используем значения привязанного инпута
    })
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" onSubmit={handleChangeAvatar} isOpen={isOpen} onClose={onClose} buttonText={"Сохранить"}>
      <input ref={avatarRef} className="popup__input popup__input-avatar" name="avatarlink" type="url" placeholder="Ссылка на аватар" required />
      <span className="popup__error" id="avatarlink-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;