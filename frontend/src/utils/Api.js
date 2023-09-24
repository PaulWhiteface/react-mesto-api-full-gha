class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _trueHeaders() {  //Объединяем заголовки, чтобы авторизация успевала записать токен и проверить его
    return {...this._headers, 'Authorization': `Bearer ${localStorage.getItem("token")}`};
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  
  getInitialCards() { //Массив карточек с сервера
    return fetch(this._baseUrl + '/cards', {
      headers: this._trueHeaders(),
    })
    .then(this._checkResponse);
  }
  
  getUserInfoFromServer() {  //Данные пользователя с сервера
    return fetch(this._baseUrl + '/users/me', {
      headers: this._trueHeaders(),
    })
    .then(this._checkResponse);
  }

  setUserInfoOnServer({name, about}) {  //Меняем данные профиля
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._trueHeaders(),
      body: JSON.stringify({name, about})
    })
    .then(this._checkResponse);
  }

  setProfileAvatar({avatar}) { //Установка автарки
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._trueHeaders(),
      body: JSON.stringify({avatar})
    })
    .then(this._checkResponse);
  }

  addCardByHandle({name, link}) {     //Отправка данных карточки на сервер и добавление ее на сайт
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._trueHeaders(),
      body: JSON.stringify({name, link})
    })
    .then(this._checkResponse);
  }

  handleDeleteCard(id) {  //Удаление карточки
    return fetch(this._baseUrl + `/cards/${id}`, {
      method: 'DELETE',
      headers: this._trueHeaders(),
    })
    .then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {  // ставим/убираем лайки 
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',  //если лайка пользователя ПРИ нет, то ставит лайк, если есть, то убирает
      headers: this._trueHeaders(),
    })
    .then(this._checkResponse)
  }
}

  const api = new Api({  // экземпляр класса Api
  baseUrl: 'https://api.mesto.whiteface.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default api;
