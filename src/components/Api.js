'use strict';

export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl
    this._authorizationNumber = data.authorizationNumber
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {headers: {
      authorization: this._authorizationNumber
      }
    })
    .then(this._returnErrorResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: {
      authorization: this._authorizationNumber
      }
    })
    .then(this._returnErrorResponse)
  }
  
  patchUserInfo(newUserName, newUserDescription) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorizationNumber,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newUserName,
        about: newUserDescription
      })
    })
    .then(this._returnErrorResponse)
  }
  
  postNewCard (newCardName, newCardLink) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorizationNumber,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newCardName,
        link: newCardLink
      })
    })
  .then(this._returnErrorResponse)
  }

  patchAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorizationNumber,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then(this._returnErrorResponse)
  }

  putLike (cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorizationNumber
        }
    })
  .then(this._returnErrorResponse)
  }

  deleteLike (cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorizationNumber
        }
    })
  .then(this._returnErrorResponse)
  }

  deleteCard (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorizationNumber
        }
    })
  .then(this._returnErrorResponse)
  }

  _returnErrorResponse(res) {
    if (res.ok) {
      return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }
}

