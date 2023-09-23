import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentuserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="main">
      <section className="profile main__profile">
        <div className="profile__change-image" onClick={onEditAvatar}>
          <img className="profile__image" src={currentUser.avatar} alt="аватар профиля" />
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button className="profile__button-name" type="button" onClick={onEditProfile}></button>
        </div>

        <button className="profile__button-photo" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="elements main__elements">
        <ul className="elements__grid">
          {cards.map((cardItem) => (
            <Card
              card={cardItem}
              key={cardItem._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main