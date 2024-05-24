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

function createCard(cardTitleDescription, cardImageLink, deleteCard, cardLike, handleImageClick ) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardImageLink;
  cardTitle.textContent = cardTitleDescription;
  cardImage.alt = cardTitleDescription;

// open image popup

  cardImage.addEventListener('click', handleImageClick);

// delete card 

  delButton.addEventListener('click', deleteCard);

  return cardElement;
}

// Функция удаления карточки

function deleteCard(evt) {
  const currentCard = evt.target.closest('.card');
  currentCard.remove();
};

// like карточки 

function cardLike (evt) {
  if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
  };
};

export {initialCards, deleteCard, createCard,  cardLike};