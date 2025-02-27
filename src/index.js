import {initialCards} from "./components/cards.js";
import {createCard, deleteCard, likeCard} from "./components/card.js";
import { openModal, closeModal, setCloseModalByClickListeners } from "./components/modal.js";
import './pages/index.css';

const container = document.querySelector(".places__list");
const openPopupAuthorButton = document.querySelector(".profile__edit-button");
const openPopupNewCardButton = document.querySelector(".profile__add-button");
const formEdit = document.querySelector('[name="edit-profile"]');
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");
const formPlace = document.querySelector('[name="new-place"]');
const inputPlace = document.querySelector('.popup__input_type_card-name');
const inputLink = document.querySelector('.popup__input_type_url');
const pictureLink = document.querySelector('.popup__image');
const pictureName = document.querySelector('.popup__caption');
const popupAuthor = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupOpenImage = document.querySelector('.popup_type_image');
const titleName = document.querySelector(".profile__title");
const titleDescription = document.querySelector(".profile__description");
const popups = [popupAuthor, popupNewCard, popupOpenImage];

function handleFormPopupAuthorSubmit(evt) {
  evt.preventDefault();
  titleName.textContent = inputName.value;
  titleDescription.textContent = inputDescription.value;
  closeModal(popupAuthor);
};

function handleFormPopupNewCardSubmit (evt) {
  evt.preventDefault();
  const card = {};
  card.name = inputPlace.value;
  card.link = inputLink.value;
  container.prepend(createCard(card, deleteCard, likeCard, openPopupImage));
  formPlace.reset();
  closeModal(popupNewCard);
};

function openPopupAuthor() {
  openModal(popupAuthor);
  inputName.value = titleName.innerHTML;
  inputDescription.value = titleDescription.innerHTML;
};

function openPopupNewCard() {
  openModal(popupNewCard);
};

function openPopupImage(item) {
  pictureLink.src = item.src;
  pictureLink.alt = item.alt;
  pictureName.textContent = item.alt;
  openModal(popupOpenImage);
}

initialCards.forEach(item => {
  container.append(createCard(item, deleteCard, likeCard, openPopupImage));
});

setCloseModalByClickListeners(popups);

openPopupAuthorButton.addEventListener('click', openPopupAuthor);
openPopupNewCardButton.addEventListener('click', openPopupNewCard);
formEdit.addEventListener('submit', handleFormPopupAuthorSubmit);
formPlace.addEventListener('submit', handleFormPopupNewCardSubmit);







