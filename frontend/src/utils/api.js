class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      headers: this._headers,
      credentials: 'include'
    })
      .then(this._handleApiResponse)
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      headers: this._headers,
      credentials: 'include'
    })
      .then(this._handleApiResponse)
  }

  editUserInfo(userInfo) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(userInfo)
    })
      .then(this._handleApiResponse)
  }

  addNewCard(cardContent) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(cardContent)
    })
      .then(this._handleApiResponse)
  }

  deleteCard(cardId) {
    return fetch(this._url + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
      .then(this._handleApiResponse)
  }

  addCardLike(cardId) {
    return fetch(this._url + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include'
    })
      .then(this._handleApiResponse)
  }

  removeCardLike(cardId) {
    return fetch(this._url + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
      .then(this._handleApiResponse)
  }

  editUserAvatar(avatarLink) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(avatarLink)
    })
      .then(this._handleApiResponse)
  }

  _handleApiResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  handleApiError(err) {
    console.log(err);
  }

  changeLikeCardStatus(cardId, isLikedByOwner) {
    if (isLikedByOwner) {
      return this.removeCardLike(cardId);
    } else {
      return this.addCardLike(cardId);
    }
  }
}

const api = new Api({
  baseUrl: 'https://api.arbuznik.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;