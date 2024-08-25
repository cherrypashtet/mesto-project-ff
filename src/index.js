import './pages/index.css';
import { deleteCard, createCard, likeCard } from './components/cards.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation, toggleButtonState } from './components/validation.js';
import { getUserInfo, getCards, editProfile, addNewCard, deleteUserCard, likeUserCard, dislikeUserCard, switchAvatar } from './components/api.js';

// DOM узлы

const mainContent = document.querySelector('.content'); // контент страницы
const placeList = document.querySelector('.places__list'); // место для вывода карточек
const addButton = mainContent.querySelector('.profile__add-button'); // кнопка добавления карточки
const editButton = mainContent.querySelector('.profile__edit-button'); // кнопка редкатирования профиля
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');

// card
const cardNameInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const cardUrlInput = popupTypeNewCard.querySelector('.popup__input_type_url');

// popup image

const popupTypeImage = document.querySelector('.popup_type_image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const popupImage = popupTypeImage.querySelector('.popup__image');

// popup Профиль 
const formElement = popupTypeEdit.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const cardForm = popupTypeNewCard.querySelector('.popup__form');

// popup avatar

const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const changeAvatarForm = popupTypeAvatar.querySelector('.popup__form');
const avatarInput = popupTypeAvatar.querySelector('.popup__input_type_url');

// Вывести карточки на страницу
// todo: не пердавать кучу элементов в createCard

Promise.all([
    getCards(), 
    getUserInfo()
])
    .then(([cardList, userData]) => {
        cardList.forEach((element) => {
            if (userData._id === element.owner._id) { // Делаем проверку на айди пользователя и айди создателя карточки
                const cardElement = createCard(element.name, element.link, element, userData, removeCard, toggleLike, handleImageClick);
                placeList.append(cardElement);
            }
            else { // Убираем дисплей и возможность удаления чужой карточки
                const cardElement = createCard(element.name, element.link, element, userData, null, toggleLike, handleImageClick);
                const cardDeleteButton = cardElement.querySelector('.card__delete-button');
                cardDeleteButton.style.display = 'none';
                placeList.append(cardElement);
            }
            
        });
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
        
        // console.log({cardList, userData})
    })
    .catch((error) => {
        console.log(`Error: ${error}`)
    })

const avatar = new URL('./images/avatar.jpg', import.meta.url);
const addIcon = new URL('./images/add-icon.svg', import.meta.url);
const card1 = new URL('./images/card_1.jpg', import.meta.url);
const card2 = new URL('./images/card_2.jpg', import.meta.url);
const card3 = new URL('./images/card_3.jpg', import.meta.url);
const close = new URL('./images/close.svg', import.meta.url);
const deleteIcon = new URL('./images/delete-icon.svg', import.meta.url);
const editIcon = new URL('./images/edit-icon.svg', import.meta.url);
const likeActive = new URL('./images/like-active.svg', import.meta.url);
const likeInactive = new URL('./images/like-inactive.svg', import.meta.url);
const logo = new URL('./images/logo.svg', import.meta.url);
const interBlack = new URL('./vendor/fonts/Inter-Black.woff2', import.meta.url);
const interMedium = new URL('./vendor/fonts/Inter-Medium.woff2', import.meta.url);
const interRegular = new URL('./vendor/fonts/Inter-Regular.woff2', import.meta.url);

const mestoImages = [
  { name: 'avatar', link: avatar },
  { name: 'addIcon', link: addIcon },
  { name: 'card1', link: card1 },
  { name: 'card2', link: card2 },
  { name: 'card3', link: card3 },
  { name: 'close', link: close },
  { name: 'deleteIcon', link: deleteIcon },
  { name: 'editIcon', link: editIcon },
  { name: 'likeActive', link: likeActive },
  { name: 'likeInactive', link: likeInactive },
  { name: 'logo', link: logo },
  { name: 'interBlack', link: interBlack },
  { name: 'interMedium', link: interMedium },
  { name: 'interRegular', link: interRegular }  
];

// Попапы

editButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    const formButton = popupTypeEdit.querySelector('.button');
    toggleButtonState(true, formButton, validationConfig);
    clearValidation(popupTypeEdit, validationConfig);
    openPopup(popupTypeEdit);
});

addButton.addEventListener('click', ()=> {
    const button = popupTypeNewCard.querySelector('.button');
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
    cardNameInput.value = '';
    cardUrlInput.value = '';
    openPopup(popupTypeNewCard);
});

profileAvatar.addEventListener('click', () => {
    openPopup(popupTypeAvatar);
})

// Изменение информации о пользователе

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const formButton = popupTypeEdit.querySelector('.button');
    formButton.textContent = 'Сохранение...';
    editProfile(nameInput.value, jobInput.value)
        .then((data) => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            formButton.textContent = 'Сохранить';
            closePopup(popupTypeEdit);
        })
        .catch((error) => {
            console.log(`Error: ${error}`)
        })

    clearValidation(popupTypeEdit, validationConfig);
};

// Изменение аватара

function changeAvatar(evt) {
    evt.preventDefault();

    const avatarUrl = avatarInput.value;
    const formButton = popupTypeAvatar.querySelector('.button');
    formButton.textContent = 'Сохранение...';
    switchAvatar(avatarUrl)
        .then(() => {
            profileAvatar.style.backgroundImage = `url(${avatarUrl})`;
            formButton.textContent = 'Сохранить';
            avatarInput.value = '';
            closePopup(popupTypeAvatar);
        })
        .catch((error) => {
            console.log(`Error: ${error}`)
        })
    clearValidation(popupTypeAvatar, validationConfig);
}

changeAvatarForm.addEventListener('submit', changeAvatar);
formElement.addEventListener('submit', handleProfileFormSubmit);


function addCard (evt) {
    evt.preventDefault();
    
    const formButton = popupTypeNewCard.querySelector('.button');
    formButton.textContent = 'Сохранение...';
    addNewCard(cardNameInput.value, cardUrlInput.value)
        .then((CardList, userData) => {
            const newCard = createCard(cardNameInput.value, cardUrlInput.value, CardList, userData, removeCard, toggleLike, handleImageClick);
            placeList.prepend(newCard);
            formButton.textContent = 'Сохранить';
            cardNameInput.value = '';
            cardUrlInput.value = '';
            toggleButtonState(false, formButton, validationConfig);
            closePopup(popupTypeNewCard);
        })
        .catch((error) => {
            console.log(`Error: ${error}`)
        })
    
    clearValidation(popupTypeNewCard, validationConfig)
}

cardForm.addEventListener('submit', addCard);

// Открытие popup изображения

function handleImageClick (evt) {
    const card = evt.target.closest('.card');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    
    popupImage.alt = cardTitle.alt;
    popupImage.src = cardImage.src;
    popupCaption.textContent = cardTitle.textContent;
  
    openPopup(popupTypeImage);
};
  

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

enableValidation(validationConfig);
clearValidation(cardForm, validationConfig);

const removeCard = (card, data) => {
    deleteUserCard(data._id).then(() => {
        deleteCard(card)
    })
    .catch((error) => {
        console.log(`Error: ${error}`)
    })
}

const toggleLike = (card, cardData) => {
    const cardLikeButton = card.querySelector('.card__like-button');
    if (!cardLikeButton.classList.contains('card__like-button_is-active')) {
        likeUserCard(cardData._id).then((newdata) => {
            likeCard(card);
            const cardLikeQuantity = card.querySelector('.card__like-quantity');
            cardLikeQuantity.textContent = newdata.likes.length;
        })
        .catch((error) => {
            console.log(`Error: ${error}`)
        })
    }
    else {
        dislikeUserCard(cardData._id).then((newdata) => {
            likeCard(card);
            const cardLikeQuantity = card.querySelector('.card__like-quantity');
            cardLikeQuantity.textContent = newdata.likes.length;
        })
        .catch((error) => {
            console.log(`Error: ${error}`)
        })
    }
}
