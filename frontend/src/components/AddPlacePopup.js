import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  function handleAddCardName(e) {
    setCardName(e.target.value);
  }

  function handleAddCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink,
    })
  }

  React.useEffect(() => {
    setCardName('')
    setCardLink('')
  }, [isOpen])

  return (
    <PopupWithForm name="card" title="Новое место" onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} buttonText={"Создать"}>
      <input value={cardName} onChange={handleAddCardName} className="popup__input popup__input-card popup__input_text_card" name="name" type="text" placeholder="Название" required minLength="2" maxLength="30" />
      <span className="popup__error" id="name-error"></span>
      <input value={cardLink} onChange={handleAddCardLink} className="popup__input popup__input-card popup__input_text_link" name="link" type="url" placeholder="Ссылка на картинку" required />
      <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;