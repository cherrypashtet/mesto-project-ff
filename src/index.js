import './pages/index.css';
import { initialCards, deleteCard, createCard, cardLike } from './components/cards.js';
import { openClosePopup } from './components/modal.js';
// DOM узлы

const mainContent = document.querySelector('.content'); // контент страницы
const placeList = document.querySelector('.places__list'); // место для вывода карточек
const addButton = mainContent.querySelector('.profile__add-button'); // кнопка добавления карточки
const editButton = mainContent.querySelector('.profile__edit-button'); // кнопка редкатирования профиля
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const saveButton = popupTypeNewCard.querySelector('.popup__button');


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
    const cardElement = createCard(element.name, element.link, deleteCard, cardLike, handleImageClick);
    placeList.append(cardElement);
});

const Avatar = new URL('./images/avatar.jpg', import.meta.url);
const AddIcon = new URL('./images/add-icon.svg', import.meta.url);
const Card1 = new URL('./images/card_1.jpg', import.meta.url);
const Card2 = new URL('./images/card_2.jpg', import.meta.url);
const Card3 = new URL('./images/card_3.jpg', import.meta.url);
const Close = new URL('./images/close.svg', import.meta.url);
const DeleteIcon = new URL('./images/delete-icon.svg', import.meta.url);
const EditIcon = new URL('./images/edit-icon.svg', import.meta.url);
const LikeActive = new URL('./images/like-active.svg', import.meta.url);
const LikeInactive = new URL('./images/like-inactive.svg', import.meta.url);
const Logo = new URL('./images/logo.svg', import.meta.url);
const InterBlack = new URL('./vendor/fonts/Inter-Black.woff2', import.meta.url);
const InterMedium = new URL('./vendor/fonts/Inter-Medium.woff2', import.meta.url);
const InterRegular = new URL('./vendor/fonts/Inter-Regular.woff2', import.meta.url);

const MestoImages = [
  { name: 'Avatar', link: Avatar },
  { name: 'AddIcon', link: AddIcon },
  { name: 'Card1', link: Card1 },
  { name: 'Card2', link: Card2 },
  { name: 'Card3', link: Card3 },
  { name: 'Close', link: Close },
  { name: 'DeleteIcon', link: DeleteIcon },
  { name: 'EditIcon', link: EditIcon },
  { name: 'LikeActive', link: LikeActive },
  { name: 'LikeInactive', link: LikeInactive },
  { name: 'Logo', link: Logo },
  { name: 'InterBlack', link: InterBlack },
  { name: 'InterMedium', link: InterMedium },
  { name: 'InterRegular', link: InterRegular }  
];

// Попапы

editButton.addEventListener('click', () => {
    openClosePopup('.popup_type_edit');
});

addButton.addEventListener('click', ()=> {
    openClosePopup('.popup_type_new-card');
});

// form

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    popupTypeEdit.classList.remove('popup_is-opened');
};

formElement.addEventListener('submit', handleFormSubmit);

function addCard (evt) {
    evt.preventDefault();

    const newCard = createCard(cardNameInput.value, cardUrlInput.value, deleteCard, cardLike);

    placeList.prepend(newCard);
    popupTypeNewCard.classList.remove('popup_is-opened');
}

cardForm.addEventListener('submit', addCard);

// like карточки 

placeList.addEventListener('click', cardLike);

// Открытие popup изображения

function handleImageClick (evt) {
    const card = evt.target.closest('.card');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    
    popupImage.alt = cardTitle.alt;
    popupImage.src = cardImage.src;
    popupCaption.textContent = cardTitle.textContent;
  
    openClosePopup('.popup_type_image');
}