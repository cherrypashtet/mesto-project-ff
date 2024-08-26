import './pages/index.css';
import { createCard, removeCard, toggleLike } from './components/cards.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation, toggleButtonState } from './components/validation.js';
import { getUserInfo, getCards, editProfile, addNewCard, switchAvatar } from './components/api.js';

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
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileFormButton = profileForm.querySelector('.button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const cardForm = document.forms['new-place'];
const cardFormButton = cardForm.querySelector('.button');

// popup avatar

const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['edit-avatar'];
const avatarFormButton = avatarForm.querySelector('.button');
const avatarInput = avatarForm.querySelector('.popup__input_type_url');

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
    inputErrorActiveClass: "form__input-error_active"
};

// Вывести карточки на страницу
// todo: не пердавать кучу элементов в createCard

Promise.all([
    getCards(), 
    getUserInfo()
])
    .then(([cardList, userData]) => {
        cardList.forEach((element) => {
            const cardElement = createCard(element.name, element.link, element, userData, removeCard, toggleLike, handleImageClick);
            placeList.append(cardElement);
        });
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
        
        // console.log({cardList, userData})
    })
    .catch(console.error)

// Попапы

editButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    toggleButtonState(false, profileFormButton, validationConfig);
    clearValidation(popupTypeEdit, validationConfig);
    openPopup(popupTypeEdit);
});

addButton.addEventListener('click', ()=> {
    cardNameInput.value = '';
    cardUrlInput.value = '';
    toggleButtonState(true, cardFormButton, validationConfig);
    clearValidation(popupTypeNewCard, validationConfig);
    openPopup(popupTypeNewCard);
});

profileAvatar.addEventListener('click', () => {
    avatarInput.value = '';
    clearValidation(popupTypeAvatar, validationConfig);
    toggleButtonState(true, avatarFormButton, validationConfig);
    openPopup(popupTypeAvatar);
})

// Изменение информации о пользователе

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    evt.submitter.textContent = 'Сохранение...';
    editProfile(nameInput.value, jobInput.value)
        .then((data) => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closePopup(popupTypeEdit);
        })
        .catch(console.error)
        .finally(() => evt.submitter.textContent = 'Сохранить')
};

// Изменение аватара

function changeAvatar(evt) {
    evt.preventDefault();

    const avatarUrl = avatarInput.value;
    evt.submitter.textContent = 'Сохранение...';
    switchAvatar(avatarUrl)
        .then(() => {
            profileAvatar.style.backgroundImage = `url(${avatarUrl})`;
            avatarInput.value = '';
            closePopup(popupTypeAvatar);
        })
        .catch(console.error)
        .finally(() => evt.submitter.textContent = 'Сохранить')
}

avatarForm.addEventListener('submit', changeAvatar);
profileForm.addEventListener('submit', handleProfileFormSubmit);


function addCard (evt) {
    evt.preventDefault();
    
    evt.submitter.textContent = 'Сохранение...';
    addNewCard(cardNameInput.value, cardUrlInput.value)
        .then((currentCard) => {
            const newCard = createCard(cardNameInput.value, cardUrlInput.value, currentCard, currentCard.owner, removeCard, toggleLike, handleImageClick);
            placeList.prepend(newCard);
            closePopup(popupTypeNewCard);
        })
        .catch(console.error)
        .finally(() => evt.submitter.textContent = 'Сохранить')
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

enableValidation(validationConfig);
clearValidation(cardForm, validationConfig);