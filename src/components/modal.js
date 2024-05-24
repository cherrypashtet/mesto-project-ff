function openClosePopup(popupType) {
    const popup = document.querySelector(popupType);
    const closeButton = popup.querySelector('.popup__close');
    popup.classList.add('popup_is-opened');

    popup.addEventListener('click', closePopup);
    document.addEventListener('keydown', closePopupEsc);
    popup.addEventListener('click', closePopupOnOverlay);

    function closePopup(evt) {
        if (evt.target === closeButton) {
            popup.classList.remove('popup_is-opened');
        };
    }

    function closePopupEsc(evt) {
        if (evt.key === 'Escape') {
            popup.classList.remove('popup_is-opened');
            document.removeEventListener('keydown', closePopupEsc);
        };
    }

    function closePopupOnOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            popup.classList.remove('popup_is-opened');
        };
    };
};

export {openClosePopup};