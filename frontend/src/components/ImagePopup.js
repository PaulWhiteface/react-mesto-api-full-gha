function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup-image ${card ? "popup_active" : ""}`}>
      <div className="popup__image-container">
        <img className="popup__image" src={card ? card.link : '#'} alt={card ? card.name : ''} />
        <h2 className="popup__image-text">{card ? card.name : ''}</h2>
        <button className="popup__close popup__close-image" type="button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;