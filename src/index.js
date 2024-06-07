import './pages/index.css';
import { initialCards, deleteCard, createCard, likeCard } from './components/cards.js';
import { openPopup, closePopup } from './components/modal.js';
// DOM узлы

const mainContent = document.querySelector('.content'); 
const placeList = document.querySelector('.places__list'); 
const addButton = mainContent.querySelector('.profile__add-button'); 
const editButton = mainContent.querySelector('.profile__edit-button'); 
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

const cardForm = popupTypeNewCard.querySelector('.popup__form');

// Вывести карточки на страницу

initialCards.forEach((element) => {
    const cardElement = createCard(element.name, element.link, deleteCard, likeCard, handleImageClick);
    placeList.append(cardElement);
});

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
    openPopup(popupTypeEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

addButton.addEventListener('click', ()=> {
    openPopup(popupTypeNewCard);
});

// form

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup(popupTypeEdit);
};

formElement.addEventListener('submit', handleProfileFormSubmit);

function addCard (evt) {
    evt.preventDefault();
    const newCard = createCard(cardNameInput.value, cardUrlInput.value, deleteCard, likeCard, handleImageClick);

    placeList.prepend(newCard);
    closePopup(popupTypeNewCard);

    evt.target.reset();
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