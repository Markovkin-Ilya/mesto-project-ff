function openModal (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalByEsc);
};

function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalByEsc);
};

function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  };
};

function setCloseModalByClickListeners(popupList) {
  popupList.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close");
    closeButton.addEventListener('click', () => { closeModal(popup)});
    popup.addEventListener('click', (evt) => { 
      if (evt.currentTarget === evt.target) {
        closeModal(evt.target);
      }
    });
  });
};

export {openModal, closeModal, setCloseModalByClickListeners};


