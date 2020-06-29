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

import './index.css';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
    authorizationNumber: '700729c8-6f90-4ed7-bfdf-eebcd18bcb3c'
  }
)
api.getUserInfo()
  .then((data) => {
    document.querySelector('.profile__name').textContent = data.name;
    document.querySelector('.profile__description').textContent = data.about;
    document.querySelector('.profile__avatar').src = data.avatar;
  })

api.getInitialCards()
  .then((cards) => {
    const cardList = new Section({
      items: cards,
      renderer: item => cardList.addItem(generateCard(item))
      }, cardsBlockSelector);
    cardList.renderItems()
  })

const generateCard = data => new Card(data, '#card', ({name, link}) => imagePopup.open(name, link), removePopup, api).generateCard()

const newCard = new Section({
  items: card,
  renderer: item => newCard.addItem(generateCard(item))
  }, cardsBlockSelector);
  
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

// Создание попапов
const editInfoPopup = new PopupWithForm(
  '.popup_profile',
  formData => {
    editInfoPopup.renderLoading(true)
    userInfo.setUserInfo(formData),
    api.patchUserInfo(formData.name, formData.description)
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
      .then((card) => {
        avatarLink.src = card.avatar
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
      .finally(() => {
        addPhotoPopup.renderLoading(false)
      });
  }); 

const imagePopup = new PopupWithImage('.popup_image');

const removePopup = new Popup('.popup_for-remove')

editButton.addEventListener('click', () => {
  editInfoPopup.open();
});
addButton.addEventListener('click', () => addPhotoPopup.open());

editAvatarButton.addEventListener('click', () => {
  editAvatarPopup.open();
});

//Запуск валидации форм
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