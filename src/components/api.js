const config = {
  baseUrl:'https://nomoreparties.co/v1/wff-cohort-33', 
  headers: {
    authorization: '16c44a00-cd7b-4602-9225-799abf9a6f4f',
    'Content-Type': 'application/json'
  }, 
};

const uploadFirstInfomation = () => {
  return Promise.all([
    fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    }),
    fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    }),
  ])
};

const editProfile = (inputName, inputAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        name: `${inputName.value}`,
        about: `${inputAbout.value}`
      })
  })
};

const requestAddCard = (inputPlace, inputLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: `${inputPlace.value}`,
        link: `${inputLink.value}`
      })
  })
};

const editAvatarPrompt = (inputAvatar) => {
  return  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
        avatar: `${inputAvatar.value}`,
      })
    })
};

const deleteCardPrompt = (cardId) => {
  return  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

const likeCardPrompt = (cardId) => {
  return  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
};

const disLikePrompt = (cardId) => {
  return  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
    })
};

export {uploadFirstInfomation, editProfile, requestAddCard, editAvatarPrompt, deleteCardPrompt, likeCardPrompt, disLikePrompt};