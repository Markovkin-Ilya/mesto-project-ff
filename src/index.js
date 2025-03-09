import {createCard, likeCard} from "./components/card.js";
import { openModal, closeModal, setCloseModalByClickListeners } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
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
const popupDeletCard = document.querySelector('.popup_type_delete')
const titleName = document.querySelector(".profile__title");
const titleDescription = document.querySelector(".profile__description");
const titleAvatar = document.querySelector(".profile__image");
const deleteButton = document.querySelector('.popup__button_delete');
const popups = [popupAuthor, popupNewCard, popupOpenImage, popupDeletCard];
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'form_submit_inactive',
  inputErrorClass: 'form_input_type_error',
  errorClass: 'form_input_error_active'
}

function handleFormPopupAuthorSubmit(evt) {
  evt.preventDefault();
  editProfile(inputName, inputDescription, titleName, titleDescription)
  closeModal(popupAuthor);
};

function handleFormPopupNewCardSubmit (evt) {
  evt.preventDefault();
  requestAddCard (inputPlace, inputLink)
  formPlace.reset();
  closeModal(popupNewCard);
};

function openPopupAuthor() {
  openModal(popupAuthor);
  inputName.value = titleName.innerHTML;
  inputDescription.value = titleDescription.innerHTML;
  clearValidation(formEdit, validationConfig);
};

function openPopupNewCard() {
  clearValidation(formPlace, validationConfig);
  inputPlace.value = '';
  inputLink.value = '';
  openModal(popupNewCard);
};

function openPopupImage(item) {
  pictureLink.src = item.src;
  pictureLink.alt = item.alt;
  pictureName.textContent = item.alt;
  openModal(popupOpenImage);
}

function openPopupDelete (cardData) {
  openModal(popupDeletCard);
  deleteButton.addEventListener('click', () => {deleteCard(cardData)});
}

setCloseModalByClickListeners(popups);

openPopupAuthorButton.addEventListener('click', openPopupAuthor);
openPopupNewCardButton.addEventListener('click', openPopupNewCard);
formEdit.addEventListener('submit', handleFormPopupAuthorSubmit);
formPlace.addEventListener('submit', handleFormPopupNewCardSubmit);

enableValidation(validationConfig); 

//FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF

function uploadFirstInfomation() {
Promise.all([
  fetch('https://nomoreparties.co/v1/wff-cohort-33/users/me', {
    headers: {
      authorization: '16c44a00-cd7b-4602-9225-799abf9a6f4f'
    }
  }),
  fetch('https://nomoreparties.co/v1/wff-cohort-33/cards', {
    headers: {
      authorization: '16c44a00-cd7b-4602-9225-799abf9a6f4f'
    }
  }),
  ])
  .then(results => Promise.all(results.map(r => r.json())))
  .then((res) => {
    res[1].forEach((card) => {
      container.append(createCard(card, deleteCard, likeCard, openPopupImage));
    })
    titleName.textContent = res[0].name;
    titleDescription.textContent = res[0].about;
    titleAvatar.src = res[0].avatar;
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  });
};

function editProfile (inputName, inputAbout, titleName, titleAbout){
  fetch('https://nomoreparties.co/v1/wff-cohort-33/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '16c44a00-cd7b-4602-9225-799abf9a6f4f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${inputName.value}`,
      about: `${inputAbout.value}`
    })
  })
  .then((res) => res.json())
  .then((res) => {
    titleName.textContent = res.name;
    titleAbout.textContent = res.about;
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  })
};

function requestAddCard (inputPlace, inputLink) {
  fetch('https://nomoreparties.co/v1/wff-cohort-33/cards', {
    method: 'POST',
    headers: {
      authorization: '16c44a00-cd7b-4602-9225-799abf9a6f4f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${inputPlace.value}`,
      link: `${inputLink.value}`
    })
  })
  .then((res) => res.json())
  .then((res) => {
    container.prepend(createCard(res, deleteCard, likeCard, openPopupImage));
  })

  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  })
};

function deleteCardPrompt(cardId){
 return  fetch(`https://nomoreparties.co/v1/wff-cohort-33/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '16c44a00-cd7b-4602-9225-799abf9a6f4f'
    }
  });
};

function deleteCard (card, cardId) {
  deleteCardPrompt(cardId)
  .then(() => card.remove())
}




uploadFirstInfomation()