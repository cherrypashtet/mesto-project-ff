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
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    };
}

function closePopupOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    };
};

function closePopupOnButton (evt) {
    if (evt.target === closeButton) {
        const openedPopup = document.querySelector('.popup_is-opened');
        const closeButton = openedPopup.querySelector('.popup__close');
        closePopup(openedPopup);
    }
}

export { openPopup, closePopup, closePopupEsc, closePopupOnButton }