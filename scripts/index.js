// @todo: Темплейт карточки

// @todo: DOM узлы

const mainContent = document.querySelector('.content'); // контент страницы
const placeList = document.querySelector('.places__list'); // место для вывода карточек
const addButton = mainContent.querySelector('.profile__add-button'); // кнопка добавления карточки
const cardTemplate = document.querySelector('#card-template').content; // разметка карточки

// @todo: Функция создания карточки

function createCard(cardTitleDescription, cardImageLink) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = cardImageLink;
    cardElement.querySelector('.card__title').textContent = cardTitleDescription;
    cardElement.querySelector('.card__image').alt = cardTitleDescription;

// @todo: Функция удаления карточки

    delButton.addEventListener('click', () => {
        cardElement.remove();
    });

    return cardElement;
}

// @todo: Вывести карточки на страницу

initialCards.forEach((element) => {
    const cardElement = createCard(element.name, element.link);
    placeList.append(cardElement);
});
