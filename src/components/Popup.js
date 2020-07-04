export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._setEventListeners();
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (evt) => this._handleOverlayClick(evt));
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }
}