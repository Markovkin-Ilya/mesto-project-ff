import {initialCards} from "./components/cards.js";
import {createCard, deleteCard, likeCard, openFoto} from "./components/card.js";
import { openModal,closeModal } from "./components/modal.js";
import './pages/index.css';

const container = document.querySelector(".places__list");
const openEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const formEdit = document.querySelector('[name="edit-profile"]');
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");
const formPlace = document.querySelector('[name="new-place"]');
const inputplace = document.querySelector('.popup__input_type_card-name');
const inputlink = document.querySelector('.popup__input_type_url');

function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = inputName.value;
  document.querySelector(".profile__description").textContent = inputDescription.value;
  closeModal("popup_type_edit");
};

function addNewCard (evt) {
  evt.preventDefault();
  const card = {};
  card.name = inputplace.value;
  card.link = inputlink.value;
  container.prepend(createCard(card, deleteCard, likeCard, openFoto));
  inputplace.value = '';
  inputlink.value = '';
  closeModal("popup_type_new-card");
};

initialCards.forEach(item => {
  container.append(createCard(item, deleteCard, likeCard, openFoto));
});

openEditButton.addEventListener('click', () => {
  openModal("popup_type_edit");
  inputName.value = document.querySelector(".profile__title").innerHTML;
  inputDescription.value = document.querySelector(".profile__description").innerHTML;
  formEdit.addEventListener('submit', handleFormSubmit);  
});

profileAddButton.addEventListener('click', () => {
  openModal("popup_type_new-card");
  formPlace.addEventListener('submit', addNewCard);
});










