import {myId} from '../pages/index.js'

export class Card {
  constructor({name, link, likes, _id, owner}, cardSelector, handleCardClick, removePopupClose, removePopupOpen, apiPutLike, apiDeleteLike, apiDeleteCard) { 
    this._name = name; 
    this._link = link; 
    this._apiDeleteCard = apiDeleteCard; 
    this._apiPutLike = apiPutLike; 
    this._apiDeleteLike = apiDeleteLike; 
    this._idCard = _id; 
    this._likes = likes; 
    this._owner = owner; 
    this._cardSelector = cardSelector; 
    this._handleCardClick = handleCardClick; 
    this._removePopupClose = removePopupClose; 
    this._removePopupOpen = removePopupOpen; 
    this._removeButton = document.querySelector('.popup__save-button_for-remove') 
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
    if (!this._element.querySelector('.card__like-button').classList.contains('card__like-button_active')) {
      this._apiPutLike(this._idCard)
      .then((card) => {
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active')
        this._element.querySelector('.card__like-amount').textContent = card.likes.length;
      })
    }
     else {this._apiDeleteLike(this._idCard)
      .then((card) => {
        this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active')
        this._element.querySelector('.card__like-amount').textContent = card.likes.length;
      })}
  };

  _imagePopup= document.querySelector('.popup_image');
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

  _removeCard = () => {  
    this._apiDeleteCard(this._idCard).then(() => {
      this._element.remove(); 
      this._removePopupClose(); 
      this._removeButton.removeEventListener('click', this._removeCard) 
    })
    .catch(() => {
      console.error('Что-то пошло не так.');
    })
  };  
 
  _openRemovePopup() {  
    this._removePopupOpen(); 
    this._removeButton.addEventListener('click', this._removeCard) 
  }; 
  
  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._like();
    }); 
    
    this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick({
      name: this._name,
      link: this._link
    }));

    this._element.querySelector('.card__remove-button').addEventListener('click', () => {
      this._openRemovePopup(); 
    }); 
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__like-amount').textContent = this._likes.length;
    if (this._owner._id === myId)
    {this._element.querySelector('.card__remove-button').classList.add('card__remove-button_active')}
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__name').textContent = this._name
    return this._element;
  }
}
    