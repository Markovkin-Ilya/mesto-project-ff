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
  clearValidation(formEdit);
};

function openPopupNewCard() {
  clearValidation(formPlace);
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

initialCards.forEach(item => {
  container.append(createCard(item, deleteCard, likeCard, openPopupImage));
});

setCloseModalByClickListeners(popups);

openPopupAuthorButton.addEventListener('click', openPopupAuthor);
openPopupNewCardButton.addEventListener('click', openPopupNewCard);
formEdit.addEventListener('submit', handleFormPopupAuthorSubmit);
formPlace.addEventListener('submit', handleFormPopupNewCardSubmit);



//ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

  
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

const clearValidation = (formElement) => {
  const buttonElement = formElement.querySelector('.popup__button');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
  hideInputError(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
  };


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form_input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form_input_error_active');
};
  
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form_input_type_error');
  errorElement.classList.remove('form_input_error_active');
  errorElement.textContent = '';
}; 
  
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity("");
    }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
      hideInputError(formElement, inputElement);
    }
}; 

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
          buttonElement.disabled = true;
      buttonElement.classList.add('form_submit_inactive');
    } else {
          buttonElement.disabled = false;
      buttonElement.classList.remove('form_submit_inactive');
    }
  }; 

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'form_submit_inactive',
    inputErrorClass: 'form_input_type_error',
    errorClass: 'form_input_error_active'
  });




