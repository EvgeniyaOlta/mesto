'use strict';

import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__title');
  }

  open(evt) {
    this._image.src = evt.currentTarget.firstElementChild.src;
    this._image.alt = evt.currentTarget.firstElementChild.alt;
    this._title.textContent = evt.currentTarget.firstElementChild.alt;
    super.open();
  }
}