import React from 'react';
import heart from '../images/heart.svg';
import trash from '../images/trash.svg';
import { CurrentUserContext } from '../contexts/CurrentuserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;  // Сравниваем id создателя карточки и id пользователя
  const isLiked = card.likes.some(i => i === currentUser._id); // Ищем id пользователя среди лайков
  const cardLikeButtonClassName = (`card__like ${isLiked && 'card__button_active'}`); //Если пользователь ставил лайк на карточку, кнопка будет активной

  function handleClick() {
    onCardClick({link: card.link, name: card.name});
  }  

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }
  
  return (
    <li className="card">
      <img className="card__photo" src={card.link} alt={card.name} onClick={handleClick}/>
      {isOwn && <button className="card__delete" type="button" onClick={handleDeleteClick}><img className="card__trash" src={trash} alt="мусорка" /></button>}
      <div className="card__description">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__container">
          <button className="card__button" type="button"><img className={cardLikeButtonClassName} src={heart} alt="Белое сердце" onClick={handleLikeClick} /></button>
          <span className="card__item-like-container">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;