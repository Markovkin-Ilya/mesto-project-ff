const cardTemplate = document.querySelector('#card-template');

function createCard (cardData, deleteCallback, likeCard, openPopupImage) {
  const cardElement = cardTemplate.content.cloneNode(true).querySelector(".card");
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const photo = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeAmount = cardElement.querySelector('.card__like-amount');
  photo.src = cardData.link;
  photo.alt = cardData.name;
  likeAmount.textContent = `${cardData.likes.length}`;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  if (cardData.likes.some(res => res._id === '0b154399d87f03068da912df')){
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', () => likeCard(likeButton, cardData._id, likeAmount) );
  photo.addEventListener('click', () => openPopupImage(photo));
  if(cardData.owner._id === '0b154399d87f03068da912df' ) {
    deleteButton.addEventListener('click', () => deleteCallback(cardElement, cardData._id));
  }
  else {
    deleteButton.style.display = "none"
  }
  return cardElement;
};

export {createCard};