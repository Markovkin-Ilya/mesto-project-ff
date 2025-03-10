import {createCard} from "./components/card.js";
import { openModal, closeModal, setCloseModalByClickListeners } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {uploadFirstInfomation, editProfile, requestAddCard, editAvatarPrompt, deleteCardPrompt, likeCardPrompt, disLikePrompt} from "./components/api.js"
import './pages/index.css';

const container = document.querySelector(".places__list");
const openPopupAuthorButton = document.querySelector(".profile__edit-button");
const openPopupNewCardButton = document.querySelector(".profile__add-button");
const openPopupAvatarButton = document.querySelector('.avatar_edit')
const formEdit = document.querySelector('[name="edit-profile"]');
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");
const formPlace = document.querySelector('[name="new-place"]');
const inputPlace = document.querySelector('.popup__input_type_card-name');
const inputLink = document.querySelector('.popup__input_type_url');
const formAvatar = document.querySelector('[name="new-avatar"]')
const inputAvatar = document.querySelector('.popup__input_type_avatar')
const pictureLink = document.querySelector('.popup__image');
const pictureName = document.querySelector('.popup__caption');
const popupAuthor = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupOpenImage = document.querySelector('.popup_type_image');
const popupDeletCard = document.querySelector('.popup_type_delete');
const popupAvatar = document.querySelector('.popup_type_avatar')
const titleName = document.querySelector(".profile__title");
const titleDescription = document.querySelector(".profile__description");
const titleAvatar = document.querySelector(".profile__image");
const deleteButton = document.querySelector('.popup__button_delete');
const popups = [popupAuthor, popupNewCard, popupOpenImage, popupDeletCard, popupAvatar];
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
  editProfile(inputName, inputDescription)
  .then((res) => res.json())
  .then((res) => {
    titleName.textContent = res.name;
    titleDescription.textContent = res.about;
    closeModal(popupAuthor);
    formEdit.querySelector('.popup__button').textContent = 'Сохраненить';
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  })
  formEdit.querySelector('.popup__button').textContent = 'Сохранение...';
};

function handleFormPopupNewCardSubmit (evt) {
  evt.preventDefault();
  requestAddCard (inputPlace, inputLink)
  .then((res) => res.json())
  .then((res) => {
    container.prepend(createCard(res, openPopupDelete, likeCard, openPopupImage));
    closeModal(popupNewCard);
    formPlace.querySelector('.popup__button').textContent = 'Сохраненить';
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  })
  formPlace.querySelector('.popup__button').textContent = 'Сохранение...';
  formPlace.reset();
};

function handlFormPopupAvatar(evt) {
  evt.preventDefault();
  editAvatarPrompt(inputAvatar)
  .then((res) => res.json())
  .then((res) => {
    formAvatar.querySelector('.popup__button').textContent = 'Сохраненить';
    titleAvatar.src = res.avatar;
    closeModal(popupAvatar);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  })
  formAvatar.querySelector('.popup__button').textContent = 'Сохранение...';
}

function openPopupAuthor() {
  openModal(popupAuthor);
  inputName.value = titleName.innerHTML;
  inputDescription.value = titleDescription.innerHTML;
  clearValidation(formEdit, validationConfig);
};

function openPopupNewCard() {
  clearValidation(formPlace, validationConfig);
  openModal(popupNewCard);
};

function openPopupAvatar() {
  clearValidation(formAvatar, validationConfig);
  openModal(popupAvatar);
}

function openPopupImage(item) {
  pictureLink.src = item.src;
  pictureLink.alt = item.alt;
  pictureName.textContent = item.alt;
  openModal(popupOpenImage);
}

function openPopupDelete (card, cardId) {
  openModal(popupDeletCard);
  deleteButton.addEventListener('click', () => {deleteCard(card, cardId)});
}

function deleteCard (card, cardId) {
  deleteCardPrompt(cardId)
  .then(() => {
    deleteButton.textContent = 'Да';
    closeModal(popupDeletCard);
    card.remove();
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err)
  });
  deleteButton.textContent = 'Удаление...';
}

function likeCard(likeButton, cardId, likeAmount) {
  if (likeButton.classList.contains('card__like-button_is-active')){
    disLikePrompt(cardId)
    .then((res) => res.json())
    .then(res => likeAmount.textContent = `${res.likes.length}`)
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err)
    });
  }
  else{
    likeCardPrompt(cardId)
    .then((res) => res.json())
    .then(res => likeAmount.textContent = `${res.likes.length}`)
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err)
    });
  }
  likeButton.classList.toggle('card__like-button_is-active');
};

openPopupAuthorButton.addEventListener('click', openPopupAuthor);
openPopupNewCardButton.addEventListener('click', openPopupNewCard);
openPopupAvatarButton.addEventListener('click', openPopupAvatar);
formEdit.addEventListener('submit', handleFormPopupAuthorSubmit);
formPlace.addEventListener('submit', handleFormPopupNewCardSubmit);
formAvatar.addEventListener('submit', handlFormPopupAvatar);

setCloseModalByClickListeners(popups);

enableValidation(validationConfig); 

uploadFirstInfomation()
.then(results => Promise.all(results.map(r => r.json())))
.then((res) => {
  res[1].forEach((card) => {
    container.append(createCard(card, openPopupDelete, likeCard, openPopupImage));
  })
  titleName.textContent = res[0].name;
  titleDescription.textContent = res[0].about;
  titleAvatar.src = res[0].avatar;
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err)
});