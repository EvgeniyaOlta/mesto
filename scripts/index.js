'use strict';

import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {cardsArray} from './cardsArray.js';

const body = document.querySelector('.root');

const addButton = body.querySelector('.profile__add-button');
const editButton = body.querySelector('.profile__edit-button');

const cardsBlock = body.querySelector('.cards');

const popup = body.querySelector('.popup');
const name = body.querySelector('.profile__name');
const description = body.querySelector('.profile__description');
const form = body.querySelector('.popup__container');
const nameInput = popup.querySelector('[name="name"]');
const descriptionInput = popup.querySelector('[name="description"]');
const closePopupButton = body.querySelector('.popup__close-button');

const newPlacePopup = body.querySelector('.popup_newplace');
const closeNewPlaceButton = newPlacePopup.querySelector('.popup__close-button');
const placeForm = newPlacePopup.querySelector('.popup__container');
const placeInput = newPlacePopup.querySelector('[name="placename"]');
const linkInput = newPlacePopup.querySelector('[name="link"]');

const imagePopup = body.querySelector('.popup_image');
const closeImageButton = imagePopup.querySelector('.popup__close-button');

/*открываем/закрываем popup*/
function escClose(event) { 
  if (event.key === 'Escape'){ 
    const sectionToClose = document.querySelector('.popup_opened');
    closeOpenPopup(sectionToClose);
  } 
}
function correctInputs() {
  nameInput.value = name.textContent; 
  descriptionInput.value = description.textContent;  
  placeInput.value =''; 
  linkInput.value = ''; 
}
function closeOpenPopup(section) { 
  correctInputs();
  section.classList.toggle('popup_opened'); 
  if (section.classList.contains('popup_opened')) {
    document.addEventListener('keyup', escClose);
  }
  else {document.removeEventListener('keyup', escClose)
  }
};
editButton.addEventListener('click', () => closeOpenPopup(popup));
addButton.addEventListener('click', () => closeOpenPopup(newPlacePopup));
closePopupButton.addEventListener('click', () => closeOpenPopup(popup));
closeNewPlaceButton.addEventListener('click', () => closeOpenPopup(newPlacePopup));
closeImageButton.addEventListener('click', () => closeOpenPopup(imagePopup));
function overlayClose(event) { 
  if (event.target.classList.contains('popup')) { 
    closeOpenPopup(event.target); 
  } 
}
body.addEventListener('click', overlayClose); 

/*создаем карточки "из коробки"*/
cardsArray.forEach((item) => {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();

  cardsBlock.append(cardElement);
});

/*редактируем данные профиля*/
function profileFormSubmitHandler(evt) { 
  evt.preventDefault(); 
  name.textContent = nameInput.value; 
  description.textContent= descriptionInput.value; 
  closeOpenPopup(popup);
};
form.addEventListener('submit', profileFormSubmitHandler); 

/*добавляем новую карточку*/
function newPlaceFormSubmitHandler(evt) { 
  evt.preventDefault(); 
  const item = {
    name: placeInput.value,
    link: linkInput.value
  };
  const card = new Card(item, '.card-template');
  const addNewCard = card.generateCard();
  cardsBlock.prepend(addNewCard); 
  placeInput.value =''; 
  linkInput.value = ''; 
  closeOpenPopup(newPlacePopup);
};
placeForm.addEventListener('submit', newPlaceFormSubmitHandler); 

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