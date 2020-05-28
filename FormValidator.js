'use strict';

export class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._submitButtonSelector = data.submitButtonSelector;
    this._activeButtonClass = data.activeButtonClass;
    this._formElement = formElement
  };
  /*Показ сообщения ошибки*/ 
  _showInputError = (inputElement, errorMessage) => { 
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); 
    inputElement.classList.add(this._inputErrorClass); 
    errorElement.textContent = errorMessage; 
    errorElement.classList.add(this._errorClass); 
  }; 
  /*Скрытие сообщения ошибки*/ 
  _hideInputError = (inputElement) => { 
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); 
    inputElement.classList.remove('popup__input_with-error'); 
    errorElement.classList.remove(this._errorClass);  
    errorElement.textContent = '';  
  };  
  /*Проверка валидности*/ 
  _isValid = (inputElement) => { 
    if (!inputElement.validity.valid) { 
      this._showInputError(inputElement, inputElement.validationMessage); 
    } else { 
      this._hideInputError(inputElement); 
    } 
  }; 
  /*Проверка инпутов на валидность*/ 
  _hasInvalidInput = (inputList) => { 
    return inputList.some((inputElement) => { 
      return !inputElement.validity.valid; 
    }) 
  }; 
  _toggleButtonState = (inputList, buttonElement) => { 
    if (this._hasInvalidInput(inputList)) { 
      buttonElement.classList.remove(this._activeButtonClass); 
      buttonElement.setAttribute("disabled", "disabled"); 
    } else { 
      buttonElement.classList.add(this._activeButtonClass); 
      buttonElement.removeAttribute("disabled", "disabled"); 
    } 
  }; 
  /*Обход всех инпутов формы*/ 
  _setEventListeners = () => {  
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); 
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector); 
    this._toggleButtonState(inputList, buttonElement); 
    inputList.forEach((inputElement) => { 
      inputElement.addEventListener('input', () => { 
        this._isValid(inputElement); 
        this._toggleButtonState(inputList, buttonElement); 
      });
      const inputPopup = inputElement.closest('.popup');
      const closeButton = inputPopup.querySelector('.popup__close-button');
      if (!inputPopup.classList.contains('popup_image')){ 
        closeButton.addEventListener('click', () => { 
          this._hideInputError(inputElement); 
        })
      }
    }); 
  }; 
  /*Запуск процесса валидации*/ 
  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => { 
      evt.preventDefault(); 
    }); 
    this._setEventListeners();
  }; 
}


