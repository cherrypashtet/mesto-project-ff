const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

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

  cardImage.addEventListener('click', handleImageClick);
  delButton.addEventListener('click', () => deleteCard(cardElement, cardList));
  cardLikeButton.addEventListener('click', () => toggleLike(cardElement, cardList));
  // delButton.addEventListener('click', deleteCard);
  // cardLikeButton.addEventListener('click', likeCard);

  return cardElement;
}

// Функция удаления карточки

// function deleteCard(evt) {
//   const currentCard = evt.target.closest('.card');
//   currentCard.remove();
// };

function deleteCard(currentCard) {
  currentCard.remove();
};

// like карточки 

// function likeCard (evt) {
//   if (evt.target.classList.contains('card__like-button')) {
//     evt.target.classList.toggle('card__like-button_is-active');
//   };
// };

function likeCard(currentCard) {
  const cardLikeButton = currentCard.querySelector('.card__like-button');
  cardLikeButton.classList.toggle('card__like-button_is-active');
}

export { initialCards, deleteCard, createCard, likeCard };