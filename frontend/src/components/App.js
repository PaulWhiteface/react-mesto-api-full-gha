import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentuserContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import apiAuth from '../utils/ApiAuth';
import InfoTooltip from './InfoTooltip';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false) //
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)       // Открытие попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)   //
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false)         //

  const [selectedCard, setSelectedCard] = React.useState(null)  // Попап при клике на картинку

  const [currentUser, setCurrentUser] = React.useState({})  // Данные пользователя

  const [cards, setCards] = React.useState([]); //Массив с карточками

  const [loggedIn, setLoggedIn] = React.useState(false); //Статус входа

  const [email, setEmail] = React.useState('');  //Переменная содержащая почту пользователя
  const [isSuccess, setIsSuccess] = React.useState(false);  //Статус регистрации/логина

  const navigate = useNavigate();

  function handleUpdateUser({ name, about }) {
    api.setUserInfoOnServer({ name, about }).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);  //Проверка лайка на карточке
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.handleDeleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((i) => i._id !== card._id)); //Фильтруем так, что в массив отправляются все карточки, кроме удаленной
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar({ avatar }) {  //Установка аватара на сервер
    api.setProfileAvatar({ avatar }).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCardByHandle({ name, link }).then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleRegistration (email, password) {   //Регистрация пользователя
    apiAuth.registration(email, password).then((data) => {
        navigate("/sign-in", {replace: true})
        setIsSuccess(true)
    })
    .catch((err)=> {
      console.log(err)
      setIsSuccess(false)
    })
    .finally(() => {
      setIsSuccessPopupOpen(true)
    })
  }

  function tokenCheckAuth() {
    const jwt = localStorage.getItem("token");
    if(jwt) {
      apiAuth.checkToken(jwt).then((user)=> {
        setLoggedIn(true);
        setEmail(user.email);
        navigate("/", {replace: true});
      })
      .catch((res)=> {
        console.log(res);
        setLoggedIn(false);
        localStorage.removeItem("token");
      })
    }
  }

  React.useEffect(()=> {     //проверка токена и отрисовка данных
    tokenCheckAuth();
    if(loggedIn) {
      Promise.all([api.getUserInfoFromServer(), api.getInitialCards()])
        .then((res) => {
          const [user, initialCards] = res;
          setCurrentUser(user);
          setCards(initialCards);
        })
        .catch((res) => {
          console.log(res);
        })
    }
  }, [loggedIn])

  function handleLogIn (email, password) {    //Вход пользователя и сохранение токена
    apiAuth.logIn(email, password).then((data) => {
      localStorage.setItem("token", data.token);
      setLoggedIn(true);
      navigate("/", {reaplace: true})
    })
    .catch((err)=> {
      console.log(err);
      setIsSuccess(false)
      setIsSuccessPopupOpen(true)
    })
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    setEmail('');
    setLoggedIn(false);
    navigate("/sign-in", {replace: true});
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)

  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);

  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null)
    setIsSuccessPopupOpen(false)
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header headerEmail={email} onOut={handleSignOut}/>
          <Routes>
            <Route path="/" element={<ProtectedRoute element={Main} loggedIn={loggedIn} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} />} />
            <Route path="/sign-in" element={<Login onLogIn={handleLogIn} loggedIn={loggedIn} />} />
            <Route path="/sign-up" element={<Register onRegistration={handleRegistration} loggedIn={loggedIn} />} />
            <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" />} />
          </Routes>
          <Footer />
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}></EditProfilePopup>
          <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}></AddPlacePopup>
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}></EditAvatarPopup>
          <PopupWithForm name="delete" title="Вы уверены?" onClose={closeAllPopups} buttonText={"Да"}>
          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip name={'success'} isSuccess={isSuccess} isOpen={isSuccessPopupOpen} onClose={closeAllPopups}/>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
