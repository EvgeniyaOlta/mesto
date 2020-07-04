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
      return !inputElement.validity.valid 
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
      const inputPopup = inputElement.closest('.popup-with-form');
      const closeButton = inputPopup.querySelector('.popup__close-button');
      closeButton.addEventListener('click', () => { 
          this._hideInputError(inputElement); 
      })
    }); 
  }; 
  /*Запуск процесса валидации*/ 
  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => { 
      evt.preventDefault(); 
    }); 
    this._setEventListeners();
  }; 

  //Очищение ошибок
  
  clearErrors() {
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
    this._inputList.forEach(input => {
      if (input.classList.contains('popup__input-error')) {
        input.classList.remove('popup__input-error');
        const errorElement = this._formElement.querySelector(`#${input.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove('popup__input-error_visible');
        }
    });
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._submitButton.classList.add('popup__save-button_disabled');
    this._submitButton.setAttribute('disabled', true);
  }
}

/*
  inputSelector: '.popup__input', 
  inputErrorClass: 'popup__input_with-error', 
  errorClass: 'popup__input-error_active', 
  submitButtonSelector: '.popup__save-button', 
  activeButtonClass: 'popup__save-button_active' 
*/

