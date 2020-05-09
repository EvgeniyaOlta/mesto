/*проверяем валидность форм*/

/*Показ сообщения ошибки*/
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
};

/*Скрытие сообщения ошибки*/
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_with-error');
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
};

/*Проверка валидности*/
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

/*Проверка инпутов на валидность*/
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.remove(object.activeButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.add(object.activeButtonClass);
    buttonElement.removeAttribute("disabled", "disabled");
  }
};

/*Обход всех инпутов формы*/
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

/*Обход всех форм страницы*/
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation( object= {
  formSelector: '.popup',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_with-error',
  errorClass: 'popup__input-error_active',
  submitButtonSelector: '.popup__save-button',
  activeButtonClass: 'popup__save-button_active'
});
