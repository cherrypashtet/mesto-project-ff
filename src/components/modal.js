// Открытие попапа

function openPopup(popupType) {
    popupType.classList.add('popup_is-opened');

    popupType.addEventListener('click', closePopupOnButton);
    document.addEventListener('keydown', closePopupEsc);
    popupType.addEventListener('click', closePopupOnOverlay);
};

// Закрытие попапа

function closePopup(popupType) {
    popupType.classList.remove('popup_is-opened');
    popupType.removeEventListener('click', closePopupOnButton);
    document.removeEventListener('keydown', closePopupEsc);
    popupType.removeEventListener('click', closePopupOnOverlay);
};

// Закрыть попап через кнопку, escape, overlay 

function closePopupEsc(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
        closePopup(openedPopup);
    };
}

function closePopupOnOverlay(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.target === evt.currentTarget) {
        closePopup(openedPopup);
    };
};

function closePopupOnButton (evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    const closeButton = openedPopup.querySelector('.popup__close');
    if (evt.target === closeButton) {
        closePopup(openedPopup);
    }
}

export { openPopup, closePopup, closePopupEsc, closePopupOnButton }