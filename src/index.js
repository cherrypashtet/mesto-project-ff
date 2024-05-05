import './pages/index.css';
import { initialCards } from './cards.js';

// @todo: Темплейт карточки

// @todo: DOM узлы

const mainContent = document.querySelector('.content'); // контент страницы
const placeList = document.querySelector('.places__list'); // место для вывода карточек
const addButton = mainContent.querySelector('.profile__add-button'); // кнопка добавления карточки
const cardTemplate = document.querySelector('#card-template').content; // разметка карточки


// @todo: Функция создания карточки

function createCard(cardTitleDescription, cardImageLink, {deleteCard} ) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = cardImageLink;
    cardElement.querySelector('.card__title').textContent = cardTitleDescription;
    cardElement.querySelector('.card__image').alt = cardTitleDescription;

// @todo: Функция удаления карточки

    delButton.addEventListener('click', deleteCard);

    return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
    const currentCard = evt.target.closest('.card');
    currentCard.remove();
};


// @todo: Вывести карточки на страницу

initialCards.forEach((element) => {
    const cardElement = createCard(element.name, element.link, {deleteCard});
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
