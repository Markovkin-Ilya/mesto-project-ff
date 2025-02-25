import { openModal } from "./modal";

const cardTemplate = document.querySelector('#card-template');

function createCard (region, deleteCallback, likeCard, openFoto) {
  const cardElement = cardTemplate.content.cloneNode(true).querySelector(".card");
  const deleteElement = cardElement.querySelector('.card__delete-button');
  const likeElement = cardElement.querySelector('.card__like-button');
  const foto = cardElement.querySelector('.card__image');
  foto.setAttribute('src', region.link);
  foto.setAttribute('alt', region.name);
  cardElement.querySelector('.card__title').textContent = region.name;
  deleteElement.addEventListener('click',  () => deleteCallback(cardElement));
  likeElement.addEventListener('click', () => likeCard(likeElement) )
  foto.addEventListener('click', () => openFoto(foto))
  return cardElement;
};

function deleteCard(item){
  item.remove()
};

function likeCard(item) {
  item.classList.toggle('card__like-button_is-active');
};

function openFoto(item) {
  const picture = document.querySelector('.popup__image');
  const name = document.querySelector('.popup__caption');
  picture.setAttribute('src', item.getAttribute('src') );
  name.textContent = item.getAttribute('alt');
  openModal('popup_type_image');
}

export {createCard, deleteCard, likeCard, openFoto};