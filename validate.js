'use strict';

/*проверяем валидность форм*/

/*Показ сообщения ошибки*/ 
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => { 
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); 
  inputElement.classList.add(inputErrorClass); 
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(errorClass); 
}; 
 
/*Скрытие сообщения ошибки*/ 
const hideInputError = (formElement, inputElement, {errorClass}) => { 
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); 
  inputElement.classList.remove('popup__input_with-error'); 
  errorElement.classList.remove(errorClass);  
  errorElement.textContent = '';  
};  
 
/*Проверка валидности*/ 
const isValid = (formElement, inputElement, newData) => { 
  if (!inputElement.validity.valid) { 
    showInputError(formElement, inputElement, inputElement.validationMessage, newData); 
  } else { 
    hideInputError(formElement, inputElement, newData); 
  } 
}; 
 
/*Проверка инпутов на валидность*/ 
const hasInvalidInput = (inputList) => { 
  return inputList.some((inputElement) => { 
    return !inputElement.validity.valid; 
  }) 
}; 
const toggleButtonState = (inputList, buttonElement, {activeButtonClass}) => { 
  if (hasInvalidInput(inputList)) { 
    buttonElement.classList.remove(activeButtonClass); 
    buttonElement.setAttribute("disabled", "disabled"); 
  } else { 
    buttonElement.classList.add(activeButtonClass); 
    buttonElement.removeAttribute("disabled", "disabled"); 
  } 
}; 
 
/*Обход всех инпутов формы*/ 
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...newData}) => {  
    const inputList = Array.from(formElement.querySelectorAll(inputSelector)); 
  const buttonElement = formElement.querySelector(submitButtonSelector); 
  toggleButtonState(inputList, buttonElement, newData); 
  inputList.forEach((inputElement) => { 
    inputElement.addEventListener('input', () => { 
      isValid(formElement, inputElement, newData); 
      toggleButtonState(inputList, buttonElement, newData); 
    });
  }); 
}; 
 
/*Обход всех форм страницы*/ 
const enableValidation = ({formSelector, ...data}) => { 
  const formList = Array.from(document.querySelectorAll(formSelector)); 
  formList.forEach((formElement) => { 
    formElement.addEventListener('submit', (evt) => { 
      evt.preventDefault(); 
    }); 
    setEventListeners(formElement, data); 
  }); 
}; 

/*вызов функции enableValidation*/
enableValidation({
  formSelector: '.popup',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_with-error',
  errorClass: 'popup__input-error_active',
  submitButtonSelector: '.popup__save-button',
  activeButtonClass: 'popup__save-button_active'
});
