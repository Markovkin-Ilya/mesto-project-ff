const CardTemplate = document.querySelector('#card-template');
const container = document.querySelector(".places__list");

function CreateCard (region) {
  const card = CardTemplate.content.cloneNode(true).querySelector(".card");
  const deletecard = card.querySelector('.card__delete-button');
  card.querySelector('.card__image').setAttribute('src', region.link);
  card.querySelector('.card__title').textContent = region.name;
  container.prepend(card);
  deletecard.addEventListener('click', function() {
    card.remove();
    });
};

initialCards.forEach(CreateCard);