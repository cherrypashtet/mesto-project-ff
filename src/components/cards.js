import { deleteUserCard, likeUserCard, dislikeUserCard } from './api.js';

// Функция создания карточки

function createCard(cardTitleDescription, cardImageLink, cardList, userData, deleteCard, toggleLike, handleImageClick ) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const isLiked = cardList.likes.some((like) => like._id === userData._id);

  cardImage.src = cardImageLink;
  cardTitle.textContent = cardTitleDescription;
  cardImage.alt = cardTitleDescription;

  const cardLikeQuantity = cardElement.querySelector('.card__like-quantity');
  cardLikeQuantity.textContent = cardList.likes.length;
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  
  if (userData._id != cardList.owner._id) {
    delButton.style.display = 'none';
  }

  cardImage.addEventListener('click', handleImageClick);
  delButton.addEventListener('click', () => deleteCard(cardElement, cardList));
  cardLikeButton.addEventListener('click', () => toggleLike(cardElement, cardList));

  return cardElement;
}

// Функция удаления карточки

function deleteCard(currentCard) {
  currentCard.remove();
};

// like карточки 

function likeCard(currentCard) {
  const cardLikeButton = currentCard.querySelector('.card__like-button');
  cardLikeButton.classList.toggle('card__like-button_is-active');
}

const removeCard = (card, data) => {
  deleteUserCard(data._id).then(() => {
      deleteCard(card)
  })
  .catch(console.error)
}

const toggleLike = (card, cardData) => {
  const cardLikeButton = card.querySelector('.card__like-button');
  if (!cardLikeButton.classList.contains('card__like-button_is-active')) {
      likeUserCard(cardData._id).then((newdata) => {
          likeCard(card);
          const cardLikeQuantity = card.querySelector('.card__like-quantity');
          cardLikeQuantity.textContent = newdata.likes.length;
      })
      .catch(console.error)
  }
  else {
      dislikeUserCard(cardData._id).then((newdata) => {
          likeCard(card);
          const cardLikeQuantity = card.querySelector('.card__like-quantity');
          cardLikeQuantity.textContent = newdata.likes.length;
      })
      .catch(console.error)
  }
}

export { deleteCard, createCard, likeCard, removeCard, toggleLike };