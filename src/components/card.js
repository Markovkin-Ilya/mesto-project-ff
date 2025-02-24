const cardTemplate = document.querySelector('#card-template');

function createCard (region, deleteCallback) {
    const cardElement = cardTemplate.content.cloneNode(true).querySelector(".card");
    const deleteElement = cardElement.querySelector('.card__delete-button');
    const foto = cardElement.querySelector('.card__image');
    foto.setAttribute('src', region.link);
    foto.setAttribute('alt', region.name);
    cardElement.querySelector('.card__title').textContent = region.name;
    deleteElement.addEventListener('click',  () => deleteCallback(cardElement));
    return cardElement;
  };

  function deleteCard(item){
    item.remove()} ;

    export {createCard, deleteCard};