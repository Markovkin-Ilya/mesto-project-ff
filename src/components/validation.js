const enableValidation = (selector) => {
  const formList = Array.from(document.querySelectorAll(selector.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, selector);
  });
};

const setEventListeners = (formElement, selector) => {
  const inputList = Array.from(formElement.querySelectorAll(selector.inputSelector));
  const buttonElement = formElement.querySelector(selector.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, selector);
      toggleButtonState(inputList, buttonElement, selector);
    });
  });
}; 

const clearValidation = (formElement, selector) => {
  const buttonElement = formElement.querySelector(selector.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(selector.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, selector);
  });
  toggleButtonState(inputList, buttonElement, selector);
};

const showInputError = (formElement, inputElement, errorMessage, selector) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selector.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selector.errorClass);
};

const hideInputError = (formElement, inputElement, selector) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selector.inputErrorClass);
  errorElement.classList.remove(selector.errorClass);
  errorElement.textContent = '';
}; 

const isValid = (formElement, inputElement, selector) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } 
  else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selector);
  } 
  else {
    hideInputError(formElement, inputElement, selector);
  }
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, selector) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(selector.inactiveButtonClass);
  } 
  else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(selector.inactiveButtonClass);
  }
}; 

export {enableValidation,clearValidation}

