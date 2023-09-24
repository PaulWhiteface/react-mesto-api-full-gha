class ApiAuth {
  constructor(url) {
    this._baseUrl = url;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  registration(email, password) {    //регистрация
    return fetch(this._baseUrl + '/signup', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({email, password}),
    })
    .then(this._checkResponse);
  }

  logIn(email, password) {
    return fetch(this._baseUrl + '/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    })
    .then(this._checkResponse)
  }

  checkToken(jwt) {
    return fetch (this._baseUrl + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      }
    })
    .then(this._checkResponse)
  }
}

const apiAuth = new ApiAuth('http://api.mesto.whiteface.nomoredomainsrocks.ru');
export default apiAuth;