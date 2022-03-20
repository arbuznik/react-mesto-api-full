class Auth {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  register(userData) {
    return fetch(this._url + '/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
      .then(this._handleApiResponse)
  }

  login(userData) {
    return fetch(this._url + '/signin', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(userData)
    })
      .then(this._handleApiResponse)
  }

  getLoggedInUser() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...this._headers
      },
    })
      .then(this._handleApiResponse)
  }

  logout() {
    return fetch(this._url + '/signout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...this._headers
      },
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
}

const auth = new Auth({
  baseUrl: 'https://api.arbuznik.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;


