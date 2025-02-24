import {initialCards} from "./cards.js";
import {createCard, deleteCard} from "./card.js";
import { openModal } from "./modal.js";
import '../pages/index.css';

const container = document.querySelector(".places__list");
const openEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");


initialCards.forEach(item => {
  container.append(createCard(item, deleteCard));
});

openEditButton.addEventListener('click', () => {
  openModal("popup_type_edit");
  
  });

profileAddButton.addEventListener('click', () => {
  openModal("popup_type_new-card");
});










