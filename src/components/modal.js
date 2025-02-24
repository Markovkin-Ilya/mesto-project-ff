let popup;
let closeButton;
let popupInputTypeName = document.querySelector(".popup__input_type_name")

function openModal (modal) {
    popup = document.querySelector(`.${modal}`);
    closeButton = popup.querySelector(".popup__close");
    popup.classList.add('popup_is-opened');
    closeButton.addEventListener('click', () => {
        closeModal(modal);
    });
    popup.addEventListener("click", (evt) => {
      if (evt.currentTarget === evt.target) {
        closeModal(modal);
      }
    });
    document.addEventListener('keydown', (evt) => {
        if (evt.keyCode == 27) {
          closeModal(modal);
        }})
  };

  function closeModal (modal) {
    popup.classList.remove('popup_is-opened');
    closeButton.removeEventListener('click', () => {
        closeModal(modal);
      })
    popup.removeEventListener("click", (evt) => {
      if (evt.currentTarget === evt.target) {
          closeModal(modal);
      }
    });
    document.removeEventListener('keydown', (evt) => {
      if (evt.keyCode == 27) {
        closeModal(modal);
      }})
  };
  

export {openModal,closeModal};


