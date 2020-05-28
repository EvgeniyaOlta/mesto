'use strict';

import {imagePopupImage, imagePopupTitle, imagePopup, closeOpenPopup} from './script.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
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

  _zoom() { 
    imagePopupImage.src = this._link; 
    imagePopupTitle.textContent = this._name;
    closeOpenPopup(imagePopup); 
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
