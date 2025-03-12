import {createCard} from "./components/card.js";
import { openModal, closeModal, setCloseModalByClickListeners} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {uploadFirstInfomation, editProfile, requestAddCard, editAvatarPrompt, deleteCardPrompt, likeCardPrompt, disLikePrompt} from "./components/api.js"
import {container, openPopupAuthorButton, openPopupNewCardButton, openPopupAvatarButton, formEdit, inputName, inputDescription, formPlace, inputPlace, inputLink, formAvatar, inputAvatar, pictureLink, pictureName, popupAuthor, popupNewCard, popupOpenImage, popupDeletCard, popupAvatar, titleName, titleDescription, titleAvatar, deleteButton, popups, validationConfig} from "./utils/constants.js"
import './pages/index.css';

let cardForDeletion;
let cardIdForDeletion;
let userId;

function handleFormPopupAuthorSubmit(evt) {
  evt.preventDefault();
  editProfile(inputName, inputDescription)
  .then((res) => {
    titleName.textContent = res.name;
    titleDescription.textContent = res.about;
    closeModal(popupAuthor);
  })
  .catch(console.error)
  .finally(() => evt.submitter.textContent = 'Сохранить')
  evt.submitter.textContent = 'Сохранение...';
};

function handleFormPopupNewCardSubmit (evt) {
  evt.preventDefault();
  requestAddCard (inputPlace, inputLink)
  .then((res) => {
    container.prepend(createCard(res, userId, openPopupDelete, likeCard, openPopupImage));
    closeModal(popupNewCard);
  })
  .catch(console.error)
  .finally(() => evt.submitter.textContent = 'Сохранить')
  evt.submitter.textContent = 'Сохранение...';
};

function handlFormPopupAvatar(evt) {
  evt.preventDefault();
  editAvatarPrompt(inputAvatar)
  .then((res) => {
    titleAvatar.src = res.avatar;
    closeModal(popupAvatar);
  })
  .catch(console.error)
  .finally(() => evt.submitter.textContent = 'Сохранить')
  evt.submitter.textContent = 'Сохранение...';
}

function openPopupAuthor() {
  openModal(popupAuthor);
  inputName.value = titleName.innerHTML;
  inputDescription.value = titleDescription.innerHTML;
  clearValidation(formEdit, validationConfig);
};

function openPopupNewCard() {
  formPlace.reset();
  clearValidation(formPlace, validationConfig);
  openModal(popupNewCard);
};

function openPopupAvatar() {
  formAvatar.reset();
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
  cardForDeletion = card;
  cardIdForDeletion = cardId;
};

function deleteCard (card, cardId) {
  deleteCardPrompt(cardId)
  .then(() => {
    closeModal(popupDeletCard);
    card.remove();
  })
  .catch(console.error)
  .finally(() => 
    deleteButton.textContent = 'Да')
  deleteButton.textContent = 'Удаление...';
}

function likeCard(likeButton, cardId, likeAmount) {
  if (likeButton.classList.contains('card__like-button_is-active')){
    disLikePrompt(cardId)
    .then(res => {
      likeAmount.textContent = `${res.likes.length}`;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(console.error)
  }
  else{
    likeCardPrompt(cardId)
    .then(res => {
      likeAmount.textContent = `${res.likes.length}`;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(console.error)
  }
};

uploadFirstInfomation()
.then(([userData, cards]) => {
  userId = userData._id;
  cards.forEach((card) => {
    container.append(createCard(card, userId, openPopupDelete, likeCard, openPopupImage));
  })
  titleName.textContent = userData.name;
  titleDescription.textContent = userData.about;
  titleAvatar.src = userData.avatar;
})
.catch(console.error)

openPopupAuthorButton.addEventListener('click', openPopupAuthor);
openPopupNewCardButton.addEventListener('click', openPopupNewCard);
openPopupAvatarButton.addEventListener('click', openPopupAvatar);
deleteButton.addEventListener('click', () => {deleteCard(cardForDeletion, cardIdForDeletion)});
formEdit.addEventListener('submit', handleFormPopupAuthorSubmit);
formPlace.addEventListener('submit', handleFormPopupNewCardSubmit);
formAvatar.addEventListener('submit', handlFormPopupAvatar);

setCloseModalByClickListeners(popups);

enableValidation(validationConfig); 