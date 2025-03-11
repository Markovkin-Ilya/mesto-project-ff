const container = document.querySelector(".places__list");
const openPopupAuthorButton = document.querySelector(".profile__edit-button");
const openPopupNewCardButton = document.querySelector(".profile__add-button");
const openPopupAvatarButton = document.querySelector('.avatar_edit')
const formEdit = document.forms["edit-profile"];
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");
const formPlace = document.forms["new-place"];
const inputPlace = document.querySelector('.popup__input_type_card-name');
const inputLink = document.querySelector('.popup__input_type_url');
const formAvatar = document.forms["new-avatar"];
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

export {container, openPopupAuthorButton, openPopupNewCardButton, openPopupAvatarButton, formEdit, inputName, inputDescription, formPlace, inputPlace, inputLink, formAvatar, inputAvatar, pictureLink, pictureName, popupAuthor, popupNewCard, popupOpenImage, popupDeletCard, popupAvatar, titleName, titleDescription, titleAvatar, deleteButton, popups, validationConfig}