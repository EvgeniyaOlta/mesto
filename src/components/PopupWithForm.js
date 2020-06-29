'use strict';

import Popup from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, handleOpen = () => {}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleOpen = handleOpen;
  }

  _clearErrors() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._inputList.forEach(input => {
      if (input.classList.contains('popup__input-error')) {
        input.classList.remove('popup__input-error');
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove('popup__input-error_visible');
        }
    });
    this._submitButton = this._form.querySelector('.popup__save-button');
    this._submitButton.classList.add('popup__save-button_disabled');
    this._submitButton.setAttribute('disabled', true);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form = this._popup.querySelector('.popup__container');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
      this._form.reset();
    })
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._form.querySelector('.popup__save-button').textContent = 'Сохранение...'
    } else {
      this._form.querySelector('.popup__save-button').textContent = 'Сохранить'
    }
  }

  open() {
    this._clearErrors();
    this._handleOpen();
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}