const cardTemplate = document.querySelector('#card-template');

function createCard (cardData, deleteCallback, likeCard, openPopupImage) {
  const cardElement = cardTemplate.content.cloneNode(true).querySelector(".card");
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const photo = cardElement.querySelector('.card__image');
  photo.src = cardData.link;
  photo.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  deleteButton.addEventListener('click',  () => deleteCallback(cardElement));
  likeButton.addEventListener('click', () => likeCard(likeButton) )
  photo.addEventListener('click', () => openPopupImage(photo))
  return cardElement;
};

function deleteCard(cardElement){
  cardElement.remove()
};

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};

export {createCard, deleteCard, likeCard};