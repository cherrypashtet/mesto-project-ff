export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
    headers: {
        authorization: '0aa79328-35c5-4618-b278-a13c709b1d1a',
        'Content-Type': 'application/json'
    }
}

export const handleResponse = (response) => {
    if (response.ok) {
        return response.json()
    }
    return Promise.reject(`Error: ${response.status}`)
}

// Получаем id пользователя

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(handleResponse)
};

// Получаем карточки с сервера

export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(handleResponse)
}

// Редактирование профиля (Отправляем новые данные методом PATCH)

export const editProfile = (userName, userAbout) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        // body: JSON.stringify({
        //     name: 'Marie Skłodowska Curie',
        //     about: 'Physicist and Chemist'
        //   })
        body: JSON.stringify({
            name: userName,
            about: userAbout
        })
    })
    .then(handleResponse)
}

// Добавление пользовательской карточки на сервер

export const addNewCard = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, { 
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
    .then(handleResponse)
}

// Удаление карточки

export const deleteUserCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse)
}

// like карточки 

export const likeUserCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(handleResponse)
}

// dislike карточки 

export const dislikeUserCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse)
}

// смена аватара 

export const switchAvatar = (userAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH', 
        headers: config.headers,
        body: JSON.stringify({
            avatar: userAvatar
        })
    })
    .then(handleResponse)
}
