const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: '417c23b5-d216-4c43-a497-aa05308a8288',
    'Content-Type': 'application/json'
  }
}


class Api {
  constructor() {    
    this._baseUrl = config.baseUrl
    this._headers = config.headers
  }
  
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then((res) => {
        return this._getResponseData(res);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  saveProfileData(nameValue, aboutValue) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: nameValue,
          about: aboutValue
        })
      })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  saveNewCard(placeName, placeLink) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: placeName,
          link: placeLink
        })
      })
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  putLikeToCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      })
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  deleteLikeToCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
        }),
      })
      .then((res) => {
        return this._getResponseData(res)
      })
  }
}

module.exports = Api
 