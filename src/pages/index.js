'use strict';
 
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {addButton} from '../utils/constants.js';
import {editButton} from '../utils/constants.js';
import {editAvatarButton}from '../utils/constants.js';
import {cardsBlockSelector} from '../utils/constants.js';
import {avatarLinkInput} from'../utils/constants.js';
import {avatarLink} from'../utils/constants.js';
import {Api} from '../components/Api.js';
import {newPlaceForm} from'../utils/constants.js';
import {avatarForm} from'../utils/constants.js';
import {profileForm} from'../utils/constants.js';

import './index.css';

export let myId;

const generateCard = data => new Card(data, '#card', ({name, link}) => imagePopup.open(name, link), () => removePopup.close(), () => removePopup.open(),
(idCard) => api.putLike(idCard), (idCard) => api.deleteLike(idCard), (idCard) => api.deleteCard(idCard)).generateCard();

const newCard = new Section({
  items: card,
  renderer: item => newCard.addItem(generateCard(item))
  }, cardsBlockSelector);

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  authorizationNumber: '700729c8-6f90-4ed7-bfdf-eebcd18bcb3c'
})

//Добавляем информацию о пользователе и карточки

const addUserInfo = new Promise(function (resolve, reject) {
  api.getUserInfo()
  .then((data) => {
    const name = data.name;
    const description = data.about;
    userInfo.setUserInfo({name, description});
    userInfo.setAvatar(data.avatar);
    myId = data._id
  })
    if (api.getUserInfo()) {
        resolve('Запрос на получение информации пользователя обработан успешно');
    } else {
        reject('Запрос отклонён');
    }
});

const addCards = new Promise(function (resolve, reject) {
  api.getInitialCards() 
  .then((cards) => { 
    const cardList = new Section({ 
      items: cards, 
      renderer: item => cardList.addItem(generateCard(item)) 
      }, cardsBlockSelector); 
    cardList.renderItems() 
  })
    if (api.getInitialCards()) {
        resolve('Запрос на получение данных карточек обработан успешно');
    } else {
        reject('Запрос отклонён');
    }
});

const promises = [addUserInfo, addCards]

Promise.all(promises)
  .then((results) => {
    console.log(results); 
  })
  .catch(() => {
    console.error('Что-то пошло не так.');
  });


// Создание попапов
const editInfoPopup = new PopupWithForm( 
  '.popup_profile', 
  formData => { 
    editInfoPopup.renderLoading(true) 
    api.patchUserInfo(formData.name, formData.description) 
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    .then(() => editInfoPopup.close())
    .catch(() => {
      console.error('Что-то пошло не так.');
    })
    .finally(() => { 
      editInfoPopup.renderLoading(false) 
    }); 
  }, 
  () => { 
    const {name, description} = userInfo.getUserInfo(); 
    document.querySelector('#name-input').value = name; 
    document.querySelector('#description-input').value = description 
  } 
); 
 
const editAvatarPopup = new PopupWithForm( 
  '.popup_for-avatar', 
  formData => { 
    editAvatarPopup.renderLoading(true) 
    api.patchAvatar(formData.avatar) 
    .then((data) => { 
      userInfo.setAvatar(data.avatar) 
    }) 
    .then(() => editAvatarPopup.close())
    .catch(() => {
      console.error('Что-то пошло не так.');
    })
    .finally(() => { 
      editAvatarPopup.renderLoading(false) 
    }); 
  }, 
  () => { 
    avatarLinkInput.value = avatarLink.src 
  } 
); 
 
const addPhotoPopup = new PopupWithForm(  
  '.popup_newplace',  
  formData => { 
    addPhotoPopup.renderLoading(true); 
    api.postNewCard(formData.name, formData.link) 
      .then((cards) => { 
        newCard.addItem(generateCard(cards)) 
      }) 
      .then(() => addPhotoPopup.close())
      .catch(() => {
        console.error('Что-то пошло не так.');
      })
      .finally(() => { 
        addPhotoPopup.renderLoading(false) 
      }); 
  });  
 
const imagePopup = new PopupWithImage('.popup_image'); 
 
const removePopup = new Popup('.popup_for-remove') 
 
editButton.addEventListener('click', () => editInfoPopup.open()); 
editButton.addEventListener('click', () => profileValidator.clearErrors()); 

addButton.addEventListener('click', () => addPhotoPopup.open()); 
addButton.addEventListener('click', () => newPlaceValidator.clearErrors()); 
 
editAvatarButton.addEventListener('click', () => editAvatarPopup.open());
editAvatarButton.addEventListener('click', () => avatarValidator.clearErrors());

//Запуск валидации форм

const selectorList = {
  inputSelector: '.popup__input', 
  inputErrorClass: 'popup__input_with-error', 
  errorClass: 'popup__input-error_active', 
  submitButtonSelector: '.popup__save-button', 
  activeButtonClass: 'popup__save-button_active' 
}

const newPlaceValidator = new FormValidator (selectorList, newPlaceForm)
newPlaceValidator.enableValidation();
const avatarValidator = new FormValidator (selectorList, avatarForm)
avatarValidator.enableValidation();
const profileValidator = new FormValidator (selectorList, profileForm)
profileValidator.enableValidation();
