'use strict';

export class Card {
  constructor({name, link}, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  };
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  };

  _like() { 
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active')
  };

  _imagePopup = document.querySelector('.popup_image');
  _imagePopupTitle= this._imagePopup.querySelector('.popup__title'); 
  _imagePopupImage= this._imagePopup.querySelector('.popup__image'); 

  _escClose(event) { 
    if (event.key === 'Escape'){
      this._closeOpenPopup();
    } 
  }

  _closeOpenPopup() { 
    this._imagePopup.classList.toggle('popup_opened'); 
    if (this._imagePopup.classList.contains('popup_opened')) {
      document.addEventListener('keyup', () => {
        this._escClose(event);
      });
    }
  };

  _zoom() { 
    this._imagePopupImage.src = this._link; 
    this._imagePopupTitle.textContent = this._name;
    this._closeOpenPopup(); 
  };
  
  _removeCard() { 
    this._element.remove();
  }; 
  
  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._like();
    }); 
    
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._zoom();
    }); 
    this._element.querySelector('.card__remove-button').addEventListener('click', () => {
      this._removeCard(); 
    }); 
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__name').textContent = this._name;

    return this._element;
  }
}
