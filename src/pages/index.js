'use strict';
 
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {cardsArray} from '../utils/constants.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {addButton} from '../utils/constants.js';
import {editButton} from '../utils/constants.js';
import {cardsBlockSelector} from '../utils/constants.js';

import './index.css';

const generateCard = data => new Card(data, '#card', ({name, link}) => imagePopup.open(name, link)).generateCard();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

// Создание попапов
const editInfoPopup = new PopupWithForm(
  '.popup_profile',
  formData => {
    userInfo.setUserInfo(formData);
  },
  () => {
    const {name, description} = userInfo.getUserInfo();
    document.querySelector('#name-input').value = name;
    document.querySelector('#description-input').value = description;
  }
);

const addPhotoPopup = new PopupWithForm(
  '.popup_newplace',
  formData => cardList.addItem(generateCard(formData))
);

const cardList = new Section({
  items: cardsArray,
  renderer: item => cardList.addItem(generateCard(item))
}, cardsBlockSelector);
cardList.renderItems();

const imagePopup = new PopupWithImage('.popup_image');

editButton.addEventListener('click', () => {
  // userInfo.getUserInfo();
  editInfoPopup.open();
});
addButton.addEventListener('click', () => addPhotoPopup.open());



//Запуск валидации форм
// editInfoFormValidator.enableValidation();
// addPhotoFormValidator.enableValidation();
/*вызов функции enableValidation*/
const formList = Array.from(document.querySelectorAll('.popup__container_for-form'));  
formList.forEach((form) => {
  const valid = new FormValidator ({
    inputSelector: '.popup__input', 
    inputErrorClass: 'popup__input_with-error', 
    errorClass: 'popup__input-error_active', 
    submitButtonSelector: '.popup__save-button', 
    activeButtonClass: 'popup__save-button_active' 
  }, form)
  valid.enableValidation();
});